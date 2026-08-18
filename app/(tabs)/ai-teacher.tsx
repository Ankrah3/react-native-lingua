import { Ionicons } from "@expo/vector-icons";
import {
  CallingState,
  FloatingParticipantView,
  StreamCall,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { images } from "@/constants/images";
import { getLessonById } from "@/data/lessons";
import { useLessonCall } from "@/hooks/useLessonCall";
import {
  useVisionAgentSession,
  type AgentConnectionStatus,
} from "@/hooks/useVisionAgentSession";
import { posthog } from "@/lib/posthog";
import useLanguageStore from "@/store/useLanguageStore";
import type { Lesson } from "@/types/learning";

type IonName = ComponentProps<typeof Ionicons>["name"];
type StatusVariant = "connecting" | "reconnecting" | "online";
type TeacherLine = { text: string; translation: string };

const PRAISE_BY_LANGUAGE: Record<string, TeacherLine> = {
  spanish: { text: "¡Muy bien!", translation: "That was great!" },
  french: { text: "Très bien !", translation: "That was great!" },
  german: { text: "Sehr gut!", translation: "That was great!" },
  chinese: { text: "很好！", translation: "That was great!" },
};

export default function AiTeacherScreen() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();

  const lesson = useMemo(
    () => (lessonId ? getLessonById(lessonId) : undefined),
    [lessonId],
  );

  const goToLessons = () => router.replace("/(tabs)/learn");

  if (!lessonId) {
    return (
      <SessionUnavailable
        title="Pick a lesson to begin"
        message="Choose a lesson from the Learn tab to start a conversation with your AI teacher."
        onPress={goToLessons}
      />
    );
  }

  if (!lesson) {
    return (
      <SessionUnavailable
        title="Lesson not found"
        message="We couldn't find that lesson. Let's head back and pick another one."
        onPress={goToLessons}
      />
    );
  }

  return <AudioLessonSession lesson={lesson} />;
}

function SessionUnavailable({
  title,
  message,
  onPress,
}: {
  title: string;
  message: string;
  onPress: () => void;
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center px-8">
        <Image
          source={images.mascot}
          style={{ width: 120, height: 120 }}
          contentFit="contain"
        />
        <Text className="mt-4 text-center font-poppins-semibold text-lg text-text-primary">
          {title}
        </Text>
        <Text className="mt-2 text-center font-poppins text-sm text-text-secondary">
          {message}
        </Text>
        <Pressable
          onPress={onPress}
          className="mt-6 rounded-full bg-lingua-purple px-6 py-3"
        >
          <Text className="font-poppins-semibold text-sm text-white">
            Go to Lessons
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function AudioLessonLoading({ lesson }: { lesson: Lesson }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center px-8">
        <Image
          source={images.mascotWelcome}
          style={{ width: 160, height: 160 }}
          contentFit="contain"
        />
        <ActivityIndicator
          size="large"
          color="#6C4EF5"
          style={{ marginTop: 16 }}
        />
        <Text className="mt-4 text-center font-poppins-semibold text-base text-text-primary">
          Connecting to your AI teacher...
        </Text>
        <Text className="mt-1 text-center font-poppins text-sm text-text-secondary">
          {lesson.title}
        </Text>
      </View>
    </SafeAreaView>
  );
}

function AudioLessonSession({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const selectedLanguageId = useLanguageStore((s) => s.selectedLanguageId);
  const { call, phase, errorMessage } = useLessonCall(
    lesson,
    selectedLanguageId,
  );

  const goToLessons = () => router.replace("/(tabs)/learn");

  useEffect(() => {
    posthog?.capture("ai_teacher_session_started", {
      lesson_id: lesson.lessonId,
    });
    return () => {
      posthog?.capture("ai_teacher_session_ended", {
        lesson_id: lesson.lessonId,
      });
    };
  }, [lesson.lessonId]);

  if (phase === "error") {
    return (
      <SessionUnavailable
        title="Couldn't start the call"
        message={
          errorMessage ??
          "Something went wrong connecting to your AI teacher. Please try again."
        }
        onPress={goToLessons}
      />
    );
  }

  if (!call || phase === "loading") {
    return <AudioLessonLoading lesson={lesson} />;
  }

  return (
    <StreamCall call={call}>
      <AudioLessonCallUI lesson={lesson} />
    </StreamCall>
  );
}

function AudioLessonCallUI({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const call = useCall();
  const {
    useCallCallingState,
    useMicrophoneState,
    useCameraState,
    useLocalParticipant,
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { status: micStatus } = useMicrophoneState();
  const { status: cameraStatus } = useCameraState();
  const localParticipant = useLocalParticipant();

  const { status: agentStatus, endSession: endAgentSession } =
    useVisionAgentSession(lesson);

  const isMuted = micStatus !== "enabled";
  const isCameraOn = cameraStatus === "enabled";
  const isOnline = callingState === CallingState.JOINED;
  const isReconnecting = callingState === CallingState.RECONNECTING;
  const hasEnded =
    callingState === CallingState.LEFT || callingState === CallingState.OFFLINE;

  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [hasPracticed, setHasPracticed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const opening = useMemo<TeacherLine>(() => {
    const [firstPhrase] = lesson.phrases;
    return firstPhrase
      ? { text: firstPhrase.text, translation: firstPhrase.translation }
      : { text: lesson.goal, translation: lesson.goal };
  }, [lesson]);

  const praise = PRAISE_BY_LANGUAGE[lesson.languageId] ?? {
    text: "Great job!",
    translation: "Keep it up!",
  };

  const teacherLine = hasPracticed ? praise : opening;

  const pulse = useSharedValue(1);

  useEffect(() => {
    if (!isSpeaking) return;
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 260 }),
        withTiming(1, { duration: 260 }),
      ),
      3,
      false,
    );
  }, [isSpeaking, pulse]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const micTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasMicEnabled = useRef(false);

  useEffect(() => {
    return () => {
      if (replayTimer.current) clearTimeout(replayTimer.current);
      if (micTimer.current) clearTimeout(micTimer.current);
    };
  }, []);

  const handleReplay = () => {
    if (replayTimer.current) clearTimeout(replayTimer.current);
    setIsSpeaking(true);
    replayTimer.current = setTimeout(() => setIsSpeaking(false), 1600);
  };

  // Every time the real mic goes from muted -> unmuted, treat it as the
  // learner having practiced the phrase and have the teacher respond.
  useEffect(() => {
    const isEnabled = micStatus === "enabled";
    if (isEnabled && !wasMicEnabled.current) {
      setHasPracticed(true);
      if (micTimer.current) clearTimeout(micTimer.current);
      micTimer.current = setTimeout(handleReplay, 400);
    }
    wasMicEnabled.current = isEnabled;
  }, [micStatus]);

  const handleMicToggle = async () => {
    try {
      await call?.microphone.toggle();
    } catch (err) {
      console.error("Failed to toggle microphone", err);
    }
  };

  const handleCameraToggle = async () => {
    try {
      await call?.camera.toggle();
    } catch (err) {
      console.error("Failed to toggle camera", err);
    }
  };

  const handleEndCall = async () => {
    await endAgentSession();
    if (call && call.state.callingState !== CallingState.LEFT) {
      await call.leave().catch((err) => console.error(err));
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/learn");
    }
  };

  if (hasEnded) {
    return (
      <SessionUnavailable
        title="Call ended"
        message="Your practice session with the AI teacher has ended."
        onPress={() => router.replace("/(tabs)/learn")}
      />
    );
  }

  const statusVariant: StatusVariant = isOnline
    ? "online"
    : isReconnecting
      ? "reconnecting"
      : "connecting";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        lesson={lesson}
        statusVariant={statusVariant}
        onBack={handleEndCall}
      />

      <View className="mx-5 mt-3 flex-1 overflow-hidden rounded-3xl bg-surface">
        <View className="absolute -top-10 -left-10 size-40 rounded-full bg-lingua-purple/10" />
        <View className="absolute -right-16 bottom-10 size-52 rounded-full bg-lingua-blue/10" />

        <View className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 shadow-sm shadow-black/10">
          <Text className="font-poppins-semibold text-xs text-text-primary">
            Lesson {lesson.order} • {lesson.title}
          </Text>
        </View>

        {localParticipant ? (
          <View className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 shadow-sm shadow-black/10">
            <Text className="font-poppins-semibold text-xs text-text-primary">
              {localParticipant.name || "You"}
            </Text>
          </View>
        ) : null}

        <View
          className="absolute inset-x-0 top-14 items-center"
          pointerEvents="none"
        >
          <AgentStatusPill status={agentStatus} />
        </View>

        <Animated.View
          style={mascotStyle}
          className="flex-1 items-center justify-end pb-24"
        >
          <Image
            source={images.mascotWelcome}
            style={{ width: 240, height: 240 }}
            contentFit="contain"
          />
        </Animated.View>

        {isCameraOn && localParticipant ? (
          <View className="absolute inset-0" pointerEvents="box-none">
            <FloatingParticipantView
              participant={localParticipant}
              alignment="top-right"
              draggableContainerStyle={{ paddingTop: 48 }}
              participantViewStyle={{ borderRadius: 16 }}
            />
          </View>
        ) : null}

        <View className="absolute inset-x-5 bottom-5 flex-row items-start rounded-2xl bg-white p-4 shadow-md shadow-black/10">
          <View className="flex-1 pr-3">
            <Text className="font-poppins-semibold text-base text-text-primary">
              {teacherLine.text}
            </Text>
            {subtitlesOn ? (
              <Text className="mt-1 font-poppins text-sm text-text-secondary">
                {teacherLine.translation}
              </Text>
            ) : null}
          </View>
          <Pressable
            onPress={handleReplay}
            hitSlop={8}
            className={`size-9 items-center justify-center rounded-full ${
              isSpeaking ? "bg-lingua-purple" : "bg-lingua-purple/10"
            }`}
          >
            <Ionicons
              name="volume-high"
              size={18}
              color={isSpeaking ? "#FFFFFF" : "#6C4EF5"}
            />
          </Pressable>
        </View>
      </View>

      <View className="mx-8 mt-5 flex-row items-start justify-between">
        <ControlButton
          icon={isMuted ? "mic-off" : "mic"}
          label="Mic"
          active={!isMuted}
          onPress={handleMicToggle}
        />
        <ControlButton
          icon={isCameraOn ? "videocam" : "videocam-off"}
          label="Camera"
          active={isCameraOn}
          onPress={handleCameraToggle}
        />
        <ControlButton
          icon="language"
          label="Subtitles"
          active={subtitlesOn}
          onPress={() => setSubtitlesOn((prev) => !prev)}
        />
        <Pressable onPress={handleEndCall} className="items-center gap-1.5">
          <View className="size-14 items-center justify-center rounded-full bg-error shadow-sm shadow-black/20">
            <Ionicons
              name="call"
              size={22}
              color="#FFFFFF"
              style={{ transform: [{ rotate: "135deg" }] }}
            />
          </View>
          <Text className="font-poppins-medium text-xs text-text-secondary">
            End Call
          </Text>
        </Pressable>
      </View>

      <View className="mx-5 mb-4 mt-5 rounded-2xl bg-surface p-4">
        {hasPracticed ? (
          <View className="flex-row justify-between">
            <FeedbackStat label="Speaking" value="Excellent" color="#21C16B" />
            <FeedbackStat
              label="Pronunciation"
              value="Great"
              color="#4D8BFF"
            />
            <FeedbackStat label="Grammar" value="Good" color="#6C4EF5" />
          </View>
        ) : (
          <Text className="text-center font-poppins text-xs text-text-secondary">
            Tap the mic and repeat after your teacher to see feedback here.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

function Header({
  lesson,
  statusVariant,
  onBack,
}: {
  lesson: Lesson;
  statusVariant: StatusVariant;
  onBack: () => void;
}) {
  const statusLabel =
    statusVariant === "online"
      ? "Online"
      : statusVariant === "reconnecting"
        ? "Reconnecting..."
        : "Connecting...";
  const dotClassName =
    statusVariant === "online"
      ? "bg-lingua-green"
      : statusVariant === "reconnecting"
        ? "bg-warning"
        : "bg-text-secondary";

  return (
    <View className="flex-row items-center px-5 pt-2">
      <Pressable onPress={onBack} hitSlop={8}>
        <Ionicons name="chevron-back" size={26} color="#0D132B" />
      </Pressable>

      <View className="flex-1 items-center">
        <Text className="font-poppins-semibold text-base text-text-primary">
          AI Teacher
        </Text>
        <View className="mt-0.5 flex-row items-center gap-1.5">
          <View className={`size-1.5 rounded-full ${dotClassName}`} />
          <Text className="font-poppins text-xs text-text-secondary">
            {statusLabel}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() =>
          Alert.alert(lesson.title, lesson.goal, [{ text: "Got it" }])
        }
        hitSlop={8}
        className="size-9 items-center justify-center rounded-full bg-surface"
      >
        <Ionicons
          name="information-circle-outline"
          size={20}
          color="#0D132B"
        />
      </Pressable>
    </View>
  );
}

function ControlButton({
  icon,
  label,
  active,
  onPress,
}: {
  icon: IonName;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="items-center gap-1.5">
      <View
        className={`size-14 items-center justify-center rounded-full shadow-sm shadow-black/10 ${
          active ? "bg-lingua-purple/10" : "bg-white"
        }`}
      >
        <Ionicons
          name={icon}
          size={20}
          color={active ? "#6C4EF5" : "#0D132B"}
        />
      </View>
      <Text className="font-poppins-medium text-xs text-text-secondary">
        {label}
      </Text>
    </Pressable>
  );
}

function AgentStatusPill({ status }: { status: AgentConnectionStatus }) {
  const label =
    status === "connected"
      ? "AI teacher online"
      : status === "connecting"
        ? "Connecting to AI teacher..."
        : status === "failed"
          ? "AI teacher unavailable"
          : "AI teacher";
  const dotClassName =
    status === "connected"
      ? "bg-lingua-green"
      : status === "connecting"
        ? "bg-warning"
        : status === "failed"
          ? "bg-error"
          : "bg-text-secondary";

  return (
    <View className="flex-row items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm shadow-black/10">
      <View className={`size-1.5 rounded-full ${dotClassName}`} />
      <Text className="font-poppins-medium text-xs text-text-primary">
        {label}
      </Text>
    </View>
  );
}

function FeedbackStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View className="items-center">
      <Text className="font-poppins text-xs text-text-secondary">
        {label}
      </Text>
      <Text
        className="mt-0.5 font-poppins-semibold text-sm"
        style={{ color }}
      >
        {value}
      </Text>
    </View>
  );
}
