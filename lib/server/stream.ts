import { StreamClient } from "@stream-io/node-sdk";

// Server-only. Never import this file from client-rendered screens or
// components - it reads the Stream API secret and must not end up in the
// app bundle. The client only ever receives the API key and a user token.
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error(
    "Add STREAM_API_KEY and STREAM_API_SECRET to your server environment",
  );
}

export const streamApiKey = apiKey;
export const streamServerClient = new StreamClient(apiKey, apiSecret);

// Clubhouse-style call type: publishing audio requires either a privileged
// role (admin/host) or an approved speak request, and the call starts in
// "backstage" until `goLive()` is called. The AI teacher and the student are
// both added as "admin" members so they can always publish - see
// app/api/stream/call+api.ts and vision-agent/agent.py.
export const LESSON_CALL_TYPE = "audio_room";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Deterministic, server-owned call id for one user's practice session on
 * one lesson. Stable across repeated requests / double taps so `getOrCreate`
 * always resolves to the same call instead of spawning parallel ones.
 */
export async function deriveLessonCallId(
  userId: string,
  lessonId: string,
  languageId: string,
): Promise<string> {
  const hash = await sha256Hex(`${userId}:${lessonId}:${languageId}`);
  return `lesson-${hash.slice(0, 24)}`;
}
