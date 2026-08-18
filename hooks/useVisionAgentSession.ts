import { useAuth } from "@clerk/expo";
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";
import { useEffect, useRef, useState } from "react";

import { AI_TEACHER_USER_ID } from "@/constants/agent";
import { startLessonAgent, stopLessonAgent } from "@/lib/stream";
import type { Lesson } from "@/types/learning";

export type AgentConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "failed";

/**
 * Starts the Vision Agent AI teacher on `lesson`'s call and stops it again
 * on unmount. Must be used inside a `<StreamCall>` for that call (it reads
 * call state to know when the agent has actually joined).
 *
 * "connecting" covers both "waiting on the start request" and "request
 * succeeded, waiting for the agent to join as a participant" - "connected"
 * only once the agent (`AI_TEACHER_USER_ID`) shows up in the call.
 */
export function useVisionAgentSession(lesson: Lesson) {
  const { getToken } = useAuth();
  // @clerk/expo returns a new `getToken` function identity on every render,
  // so it can't safely sit in the effect's dependency array below (that
  // would restart the session on every unrelated re-render). Keep the
  // latest one in a ref instead.
  const getTokenRef = useRef(getToken);
  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const agentJoined = participants.some(
    (participant) => participant.userId === AI_TEACHER_USER_ID,
  );

  const [requestState, setRequestState] = useState<
    "idle" | "connecting" | "started" | "failed"
  >("idle");

  const sessionIdRef = useRef<string | null>(null);
  const stoppedRef = useRef(false);
  const stopRef = useRef<() => Promise<void>>(async () => {});
  stopRef.current = async () => {
    if (stoppedRef.current) return;
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;
    stoppedRef.current = true;
    try {
      await stopLessonAgent(
        () => getTokenRef.current(),
        lesson.lessonId,
        sessionId,
      );
    } catch (err) {
      console.error("Failed to stop the AI teacher session", err);
    }
  };

  useEffect(() => {
    stoppedRef.current = false;
    sessionIdRef.current = null;
    let cancelled = false;
    setRequestState("connecting");

    (async () => {
      try {
        const { sessionId } = await startLessonAgent(
          () => getTokenRef.current(),
          lesson.lessonId,
        );
        if (cancelled) {
          // Unmounted while the request was in flight - stop it right away
          // instead of leaving an orphaned agent session behind.
          stoppedRef.current = true;
          stopLessonAgent(
            () => getTokenRef.current(),
            lesson.lessonId,
            sessionId,
          ).catch((err) => console.error(err));
          return;
        }
        sessionIdRef.current = sessionId;
        setRequestState("started");
      } catch (err) {
        console.error("Failed to start the AI teacher session", err);
        if (!cancelled) setRequestState("failed");
      }
    })();

    return () => {
      cancelled = true;
      stopRef.current();
    };
  }, [lesson.lessonId]);

  const status: AgentConnectionStatus =
    requestState === "failed"
      ? "failed"
      : requestState === "idle"
        ? "idle"
        : agentJoined
          ? "connected"
          : "connecting";

  return { status, endSession: () => stopRef.current() };
}
