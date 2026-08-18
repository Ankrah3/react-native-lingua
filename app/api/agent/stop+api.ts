import { getLessonById } from "@/data/lessons";
import { requireAuthenticatedUserId } from "@/lib/server/clerk";
import { deriveLessonCallId } from "@/lib/server/stream";
import { stopAgentSession } from "@/lib/server/visionAgent";

/** Requests closure of a running AI teacher session. Idempotent. */
export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requireAuthenticatedUserId(request);
  } catch (err) {
    console.error("Failed to authenticate agent stop request", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { lessonId?: unknown; sessionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { lessonId, sessionId } = body;
  if (!lessonId || typeof lessonId !== "string") {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }
  if (!sessionId || typeof sessionId !== "string") {
    return Response.json({ error: "sessionId is required" }, { status: 400 });
  }

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return Response.json({ error: "Unknown lessonId" }, { status: 400 });
  }

  const callId = await deriveLessonCallId(userId, lessonId, lesson.languageId);

  try {
    await stopAgentSession(callId, sessionId);
  } catch (err) {
    console.error("Failed to stop the AI teacher session", err);
    return Response.json(
      { error: "Failed to stop the AI teacher" },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
