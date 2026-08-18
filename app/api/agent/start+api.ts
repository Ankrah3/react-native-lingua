import { getLessonById } from "@/data/lessons";
import { requireAuthenticatedUserId } from "@/lib/server/clerk";
import { LESSON_CALL_TYPE, deriveLessonCallId } from "@/lib/server/stream";
import { startAgentSession } from "@/lib/server/visionAgent";

/**
 * Starts the Vision Agent AI teacher and has it join the calling user's
 * lesson call. The call itself must already exist (see
 * app/api/stream/call+api.ts) - this only proxies to the Python agent's HTTP
 * server, keeping its shared secret and base URL out of the mobile app.
 */
export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requireAuthenticatedUserId(request);
  } catch (err) {
    console.error("Failed to authenticate agent start request", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { lessonId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { lessonId } = body;
  if (!lessonId || typeof lessonId !== "string") {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return Response.json({ error: "Unknown lessonId" }, { status: 400 });
  }

  // Same derivation the call was created with - resolves to the same
  // call id without trusting a client-supplied one.
  const callId = await deriveLessonCallId(userId, lessonId, lesson.languageId);

  try {
    const { sessionId } = await startAgentSession(callId, LESSON_CALL_TYPE);
    return Response.json({ sessionId });
  } catch (err) {
    console.error("Failed to start the AI teacher session", err);
    return Response.json(
      { error: "Failed to start the AI teacher" },
      { status: 502 },
    );
  }
}
