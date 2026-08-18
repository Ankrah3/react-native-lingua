import { useAuth } from "@clerk/expo";
import {
  Call,
  CallingState,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useRef, useState } from "react";

import { createLessonCall } from "@/lib/stream";
import type { Lesson } from "@/types/learning";

export type LessonCallPhase = "loading" | "active" | "error";

/**
 * Starts (or rejoins) the audio-only Stream call bound to one lesson for the
 * signed-in user. The server derives the call id and the call's language
 * from the lesson record - `languageId` here is only sent so the server can
 * flag a client that's out of sync with the lesson.
 */
export function useLessonCall(lesson: Lesson, languageId: string | null) {
  const client = useStreamVideoClient();
  const { getToken } = useAuth();
  // @clerk/expo returns a new `getToken` function identity on every render,
  // so it can't safely sit in the effect's dependency array below (that
  // would rejoin the call on every unrelated re-render). Keep the latest
  // one in a ref instead.
  const getTokenRef = useRef(getToken);
  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const [call, setCall] = useState<Call>();
  const [phase, setPhase] = useState<LessonCallPhase>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    let cancelled = false;
    let activeCall: Call | undefined;

    (async () => {
      setPhase("loading");
      setErrorMessage(null);
      try {
        const session = await createLessonCall(
          () => getTokenRef.current(),
          lesson.lessonId,
          languageId,
        );
        if (cancelled) return;

        const c = client.call(session.callType, session.callId, {
          reuseInstance: true,
        });
        activeCall = c;
        setCall(c);

        await c.join({ create: true });
        if (cancelled) return;

        setPhase("active");
      } catch (err) {
        console.error("Failed to start the audio lesson call", err);
        if (!cancelled) {
          setErrorMessage(
            err instanceof Error ? err.message : "Something went wrong",
          );
          setPhase("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (activeCall && activeCall.state.callingState !== CallingState.LEFT) {
        activeCall.leave().catch((err) => console.error(err));
      }
      setCall(undefined);
    };
  }, [client, lesson.lessonId, languageId]);

  return { call, phase, errorMessage };
}
