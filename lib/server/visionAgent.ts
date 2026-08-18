// Server-only. Talks to the Python Vision Agent's HTTP server (vision-agent/,
// `uv run agent.py serve`) to start/stop the AI teacher's session on a call.
// Never import this file from client-rendered screens or components - the
// shared secret must not end up in the app bundle.
const rawBaseUrl = process.env.VISION_AGENT_BASE_URL;
const rawSharedSecret = process.env.AGENT_SHARED_SECRET;

if (!rawBaseUrl) {
  throw new Error("Add VISION_AGENT_BASE_URL to your server environment");
}
if (!rawSharedSecret) {
  throw new Error("Add AGENT_SHARED_SECRET to your server environment");
}

const baseUrl = rawBaseUrl.replace(/\/$/, "");
const sharedSecret = rawSharedSecret;

async function agentFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      "X-Agent-Shared-Secret": sharedSecret,
      "Content-Type": "application/json",
    },
  });
}

/** Starts a fresh AI teacher session and has it join `callId`. */
export async function startAgentSession(
  callId: string,
  callType: string,
): Promise<{ sessionId: string }> {
  const response = await agentFetch(`/calls/${callId}/sessions`, {
    method: "POST",
    body: JSON.stringify({ call_type: callType }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Vision agent failed to start session (status ${response.status}): ${body}`,
    );
  }

  const data = (await response.json()) as { session_id: string };
  return { sessionId: data.session_id };
}

/** Requests closure of a running AI teacher session. Idempotent. */
export async function stopAgentSession(
  callId: string,
  sessionId: string,
): Promise<void> {
  const response = await agentFetch(
    `/calls/${callId}/sessions/${sessionId}`,
    { method: "DELETE" },
  );

  if (!response.ok && response.status !== 404) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Vision agent failed to stop session (status ${response.status}): ${body}`,
    );
  }
}
