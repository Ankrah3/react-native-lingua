import { AI_TEACHER_USER_ID } from "@/constants/agent";
import { getLessonById } from "@/data/lessons";
import { requireAuthenticatedUserId } from "@/lib/server/clerk";
import {
  LESSON_CALL_TYPE,
  deriveLessonCallId,
  streamServerClient,
} from "@/lib/server/stream";

const CALL_TYPE = LESSON_CALL_TYPE;

export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requireAuthenticatedUserId(request);
  } catch (err) {
    console.error("Failed to authenticate Stream call request", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { lessonId?: unknown; languageId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { lessonId, languageId: requestedLanguageId } = body;
  if (!lessonId || typeof lessonId !== "string") {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }
  if (
    requestedLanguageId !== undefined &&
    typeof requestedLanguageId !== "string"
  ) {
    return Response.json({ error: "languageId must be a string" }, {
      status: 400,
    });
  }

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return Response.json({ error: "Unknown lessonId" }, { status: 400 });
  }

  // The lesson record is the single source of truth for the call's
  // language. A client-supplied languageId is only ever used to validate
  // that the client isn't out of sync - it never overrides the lesson.
  if (requestedLanguageId && requestedLanguageId !== lesson.languageId) {
    return Response.json(
      { error: "languageId does not match the lesson's language" },
      { status: 400 },
    );
  }
  const languageId = lesson.languageId;

  const callId = await deriveLessonCallId(userId, lessonId, languageId);

  try {
    // The agent user is only ever referenced here (as a call member) and by
    // the Python agent when it joins - upsert it so the membership below
    // doesn't fail on a user id Stream hasn't seen yet.
    await streamServerClient.upsertUsers([
      { id: AI_TEACHER_USER_ID, name: "AI Teacher" },
    ]);

    const call = streamServerClient.video.call(CALL_TYPE, callId);
    // Idempotent: repeated requests / double taps resolve to the same call
    // instead of creating parallel ones.
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        // Both members are "admin" so they can publish audio immediately -
        // audio_room otherwise gates publishing behind a speak-request flow.
        members: [
          { user_id: userId, role: "admin" },
          { user_id: AI_TEACHER_USER_ID, role: "admin" },
        ],
        // Read by the Python agent via `call.custom_data` once it joins -
        // see vision-agent/agent.py.
        custom: {
          lessonId,
          languageId,
          goal: lesson.goal,
          vocabulary: lesson.vocabulary,
          phrases: lesson.phrases,
          aiTeacherPrompt: lesson.aiTeacherPrompt,
        },
        settings_override: {
          video: {
            enabled: true,
            camera_default_on: false,
            target_resolution: { width: 320, height: 240 },
          },
          audio: { mic_default_on: false, default_device: "speaker" },
        },
      },
    });

    // audio_room calls start in "backstage" - go live immediately so audio
    // flows for both participants as soon as they join, instead of only
    // once someone with permission calls goLive() later.
    try {
      await call.goLive();
    } catch (err) {
      // Expected on a retried/idempotent request once the call is already
      // live - not fatal.
      console.warn("Stream call goLive() skipped", err);
    }
  } catch (err) {
    console.error("Failed to create Stream call", err);
    return Response.json({ error: "Failed to create call" }, { status: 502 });
  }

  return Response.json({ callId, callType: CALL_TYPE, languageId, lessonId });
}
