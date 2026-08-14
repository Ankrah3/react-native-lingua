import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { buildLessonsViewModel } from "@/data/progress";
import { posthog } from "@/lib/posthog";
import useLanguageStore from "@/store/useLanguageStore";
import type { LessonListItem } from "@/types/progress";

type ScreenTab = "lessons" | "practice";

export default function LearnScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ScreenTab>("lessons");
  const [isSaved, setIsSaved] = useState(false);
  const selectedLanguageId = useLanguageStore((s) => s.selectedLanguageId);

  const selectedLanguage = useMemo(
    () =>
      selectedLanguageId ? getLanguageById(selectedLanguageId) : undefined,
    [selectedLanguageId],
  );

  const lessonsView = useMemo(
    () => (selectedLanguage ? buildLessonsViewModel(selectedLanguage) : null),
    [selectedLanguage],
  );

  if (!lessonsView) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="book-outline" size={48} color="#6B7280" />
          <Text className="mt-4 text-center font-poppins-semibold text-lg text-text-primary">
            No lessons yet for this language
          </Text>
          <Text className="mt-2 text-center font-poppins text-sm text-text-secondary">
            Pick another language to start learning right away.
          </Text>
          <Pressable
            onPress={() => router.push("/language")}
            className="mt-6 rounded-full bg-lingua-purple px-6 py-3"
          >
            <Text className="font-poppins-semibold text-sm text-white">
              Choose a language
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-row items-center px-5 pt-2">
        <Pressable
          onPress={() =>
            router.canGoBack()
              ? router.back()
              : router.replace("/(tabs)/home")
          }
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#0D132B" />
        </Pressable>

        <View className="flex-1 items-center">
          <Text
            className="font-poppins-semibold text-lg text-text-primary"
            numberOfLines={1}
          >
            {lessonsView.headerTitle}
          </Text>
          <Text className="mt-0.5 font-poppins text-xs text-text-secondary">
            Unit {lessonsView.unitOrder} • {lessonsView.unitCompleted}/
            {lessonsView.unitTotal} lessons
          </Text>
        </View>

        <Pressable onPress={() => setIsSaved((prev) => !prev)} hitSlop={8}>
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={24}
            color={isSaved ? "#6C4EF5" : "#0D132B"}
          />
        </Pressable>
      </View>

      <View className="mx-5 mt-4 aspect-[1175/912] overflow-hidden rounded-3xl bg-surface">
        <Image
          source={images.palace}
          className="absolute bottom-0 left-0 h-full w-3/4"
          contentFit="contain"
          contentPosition="left bottom"
        />
        <Image
          source={images.mascotWelcome}
          className="absolute bottom-6 right-2"
          style={{ height: "62%", aspectRatio: 1 }}
          contentFit="contain"
          contentPosition="bottom"
        />
      </View>

      <View className="z-10 mx-5 -mt-6 flex-row rounded-full bg-white p-1 shadow-sm shadow-black/10">
        <Pressable
          onPress={() => setActiveTab("lessons")}
          className={`flex-1 items-center rounded-full py-2.5 ${
            activeTab === "lessons" ? "bg-lingua-purple/10" : ""
          }`}
        >
          <Text
            className={`font-poppins-semibold text-sm ${
              activeTab === "lessons"
                ? "text-lingua-purple"
                : "text-text-secondary"
            }`}
          >
            Lessons
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("practice")}
          className={`flex-1 items-center rounded-full py-2.5 ${
            activeTab === "practice" ? "bg-lingua-purple/10" : ""
          }`}
        >
          <Text
            className={`font-poppins-semibold text-sm ${
              activeTab === "practice"
                ? "text-lingua-purple"
                : "text-text-secondary"
            }`}
          >
            Practice
          </Text>
        </Pressable>
      </View>

      {activeTab === "lessons" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 32,
          }}
        >
          {lessonsView.items.map((item) => (
            <LessonRow
              key={item.lessonId}
              item={item}
              onPress={() => {
                posthog?.capture("lesson_opened", {
                  lesson_id: item.lessonId,
                  language_id: lessonsView.languageId,
                  status: item.status,
                });
                router.push({
                  pathname: "/(tabs)/ai-teacher",
                  params: { lessonId: item.lessonId },
                });
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="barbell-outline" size={48} color="#6B7280" />
          <Text className="mt-4 text-center font-poppins-semibold text-lg text-text-primary">
            Practice is on its way
          </Text>
          <Text className="mt-2 text-center font-poppins text-sm text-text-secondary">
            Review exercises for completed lessons will show up here soon.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function LessonRow({
  item,
  onPress,
}: {
  item: LessonListItem;
  onPress: () => void;
}) {
  const isLocked = item.status === "locked";
  const isCurrent = item.status === "in-progress";
  const isCompleted = item.status === "completed";

  return (
    <Pressable
      disabled={isLocked}
      onPress={onPress}
      className={`mb-3 flex-row items-center rounded-2xl border p-4 ${
        isCurrent
          ? "border-lingua-purple bg-lingua-purple/5"
          : "border-border bg-white"
      } ${isLocked ? "opacity-60" : ""}`}
    >
      <View className="flex-1">
        <Text
          className={`font-poppins text-xs ${
            isCurrent ? "text-lingua-purple" : "text-text-secondary"
          }`}
        >
          Lesson {item.order}
        </Text>
        <Text
          className={`mt-0.5 font-poppins-semibold text-base ${
            isCurrent
              ? "text-lingua-purple"
              : isLocked
                ? "text-text-secondary"
                : "text-text-primary"
          }`}
        >
          {item.title}
        </Text>
        {isCurrent ? (
          <Text className="mt-0.5 font-poppins-semibold text-xs text-lingua-purple">
            In progress
          </Text>
        ) : null}
        <Text className="mt-0.5 font-poppins text-xs text-text-secondary">
          {item.durationMinutes} min • {item.xpReward} XP
        </Text>
      </View>

      {isCompleted ? (
        <View className="size-7 items-center justify-center rounded-full bg-lingua-green">
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : isCurrent ? (
        <Image
          source={images.palace}
          className="h-11 w-11"
          contentFit="contain"
        />
      ) : (
        <View className="size-7 items-center justify-center rounded-full border-2 border-border">
          <Ionicons name="lock-closed" size={12} color="#9CA3AF" />
        </View>
      )}
    </Pressable>
  );
}
