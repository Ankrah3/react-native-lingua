import Constants from "expo-constants";

import type {
  AgentSessionResponse,
  StreamCallResponse,
  StreamSessionResponse,
} from "@/types/stream";

function resolveApiBaseUrl(): string {
  const explicit = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Dev fallback: reuse the Metro dev server's host so a physical device or
  // simulator can reach the local Expo API routes without extra config.
  const hostUri =
    Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost;
  const host = hostUri?.split(":")[0];
  if (host) return `http://${host}:8081`;

  return "http://localhost:8081";
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Clerk session tokens are short-lived (~60s) and Clerk only rotates its
// cached token on its own background timer - calling getToken() again right
// away typically returns the same (possibly already-expired) token. On a
// slow first request to a route (e.g. Metro cold-bundling an API route can
// take 30-90s) that means one immediate retry often isn't enough. Retry a
// few times with backoff so there's time for Clerk's token to actually
// rotate before giving up.
const AUTH_RETRY_DELAYS_MS = [1000, 2000, 4000];

async function authedFetch<T>(
  path: string,
  getToken: () => Promise<string | null>,
  init?: RequestInit,
): Promise<T> {
  const send = (token: string) =>
    fetch(`${resolveApiBaseUrl()}${path}`, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

  let response: Response | undefined;
  for (let attempt = 0; attempt <= AUTH_RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await sleep(AUTH_RETRY_DELAYS_MS[attempt - 1]);

    const token = await getToken();
    if (!token) throw new Error("Not authenticated");
    response = await send(token);

    if (response.status !== 401) break;
  }
  if (!response) throw new Error("Not authenticated");

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ?? `Request to ${path} failed with status ${response.status}`,
    );
  }

  return response.json();
}

export function fetchStreamSession(
  getToken: () => Promise<string | null>,
): Promise<StreamSessionResponse> {
  return authedFetch("/api/stream/session", getToken, { method: "GET" });
}

export function createLessonCall(
  getToken: () => Promise<string | null>,
  lessonId: string,
  languageId: string | null,
): Promise<StreamCallResponse> {
  return authedFetch("/api/stream/call", getToken, {
    method: "POST",
    body: JSON.stringify({ lessonId, languageId: languageId ?? undefined }),
  });
}

export function startLessonAgent(
  getToken: () => Promise<string | null>,
  lessonId: string,
): Promise<AgentSessionResponse> {
  return authedFetch("/api/agent/start", getToken, {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
}

export async function stopLessonAgent(
  getToken: () => Promise<string | null>,
  lessonId: string,
  sessionId: string,
): Promise<void> {
  await authedFetch("/api/agent/stop", getToken, {
    method: "POST",
    body: JSON.stringify({ lessonId, sessionId }),
  });
}
