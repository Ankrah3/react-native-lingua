import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "@/lib/image";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { buildHomeViewModel } from "@/data/progress";
import { posthog } from "@/lib/posthog";
import useLanguageStore from "@/store/useLanguageStore";
import type { TodayPlanIcon } from "@/types/progress";

const PLAN_ICON: Record<TodayPlanIcon, keyof typeof Ionicons.glyphMap> = {
  lesson: "book",
  conversation: "headset",
  words: "chatbubble-ellipses",
};

const PLAN_ICON_BG: Record<TodayPlanIcon, string> = {
  lesson: "bg-lingua-purple",
  conversation: "bg-lingua-purple",
  words: "bg-[#FF6B81]",
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const selectedLanguageId = useLanguageStore((s) => s.selectedLanguageId);
  const resetSelectedLanguage = useLanguageStore(
    (s) => s.resetSelectedLanguage,
  );

  const selectedLanguage = useMemo(
    () =>
      selectedLanguageId ? getLanguageById(selectedLanguageId) : undefined,
    [selectedLanguageId],
  );

  const home = useMemo(
    () => (selectedLanguage ? buildHomeViewModel(selectedLanguage) : null),
    [selectedLanguage],
  );

  useEffect(() => {
    if (selectedLanguageId && !selectedLanguage) {
      resetSelectedLanguage();
      router.replace("/language");
    }
  }, [selectedLanguageId, selectedLanguage, resetSelectedLanguage, router]);

  if (!home) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
  }

  const goalProgress = Math.min(home.earnedXpToday / home.dailyGoalXp, 1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="flex-row items-center justify-between px-5 pt-2">
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: home.languageFlag }}
              className="size-11 rounded-full"
              contentFit="cover"
            />
            <Text className="font-poppins-semibold text-lg text-text-primary">
              {home.greeting}, {user?.firstName ?? "there"}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                className="w-[22px] h-[22px]"
                contentFit="contain"
              />
              <Text className="font-poppins-bold text-base text-streak">
                {home.streakDays}
              </Text>
            </View>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#0D132B"
            />
          </View>
        </View>

        <View className="mx-5 mt-5 flex-row items-center justify-between rounded-3xl bg-[#FDF0E1] p-4">
          <View className="flex-1">
            <Text className="font-poppins text-sm text-text-secondary">
              Daily goal
            </Text>
            <Text className="mt-1 font-poppins-bold text-2xl text-text-primary">
              {home.earnedXpToday} / {home.dailyGoalXp} XP
            </Text>
            <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/60">
              <View
                className="h-2 rounded-full bg-streak"
                style={{ width: `${goalProgress * 100}%` }}
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            className="w-[72px] h-[72px] ml-3"
            contentFit="contain"
          />
        </View>

        <Pressable
          onPress={() => {
            posthog?.capture("learning_continued", {
              language_id: selectedLanguageId,
              ...(home.currentUnit
                ? { unit_order: home.currentUnit.order }
                : {}),
            });
            router.push("/(tabs)/learn");
          }}
          className="mx-5 mt-4 overflow-hidden rounded-3xl bg-lingua-purple p-5"
        >
          <Text className="font-poppins text-sm text-white/80">
            Continue learning
          </Text>
          <Text className="mt-1 font-poppins-bold text-2xl text-white">
            {home.languageLabel}
          </Text>
          {home.currentUnit ? (
            <Text className="mt-1 font-poppins text-sm text-white/80">
              A1 • Unit {home.currentUnit.order}
            </Text>
          ) : null}

          <View className="mt-4 self-start rounded-full bg-white px-5 py-2.5">
            <Text className="font-poppins-semibold text-sm text-lingua-purple">
              Continue
            </Text>
          </View>

          <Image
            source={images.palace}
            className="absolute -right-5 -bottom-2.5 w-40 h-40 opacity-90"
            contentFit="contain"
            pointerEvents="none"
          />
        </Pressable>

        <View className="mx-5 mt-6 flex-row items-center justify-between">
          <Text className="font-poppins-semibold text-lg text-text-primary">
            Today&apos;s plan
          </Text>
          <Pressable onPress={() => router.push("/(tabs)/learn")} hitSlop={8}>
            <Text className="font-poppins-semibold text-sm text-lingua-purple">
              View all
            </Text>
          </Pressable>
        </View>

        <View className="mx-5 mt-3">
          {home.todayPlan.map((item, index) => {
            const isLocked = item.status === "locked";

            return (
              <Pressable
                key={item.id}
                disabled={isLocked}
                onPress={() => {
                  posthog?.capture("learning_plan_item_opened", {
                    item_id: item.id,
                    item_type: item.icon,
                    item_status: item.status,
                    language_id: selectedLanguageId,
                  });
                  router.push("/(tabs)/learn");
                }}
                className={`flex-row items-center py-3 ${
                  index < home.todayPlan.length - 1
                    ? "border-b border-border"
                    : ""
                } ${isLocked ? "opacity-60" : ""}`}
              >
                <View
                  className={`size-11 items-center justify-center rounded-2xl ${PLAN_ICON_BG[item.icon]}`}
                >
                  <Ionicons
                    name={PLAN_ICON[item.icon]}
                    size={20}
                    color="#FFFFFF"
                  />
                </View>

                <View className="ml-3 flex-1">
                  <Text className="font-poppins-semibold text-base text-text-primary">
                    {item.title}
                  </Text>
                  <Text className="mt-0.5 font-poppins text-sm text-text-secondary">
                    {item.subtitle}
                  </Text>
                </View>

                {item.status === "completed" ? (
                  <View className="size-7 items-center justify-center rounded-full bg-lingua-purple">
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                ) : isLocked ? (
                  <View className="size-7 items-center justify-center rounded-full border-2 border-border">
                    <Ionicons name="lock-closed" size={12} color="#9CA3AF" />
                  </View>
                ) : (
                  <View className="size-7 rounded-full border-2 border-border" />
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
