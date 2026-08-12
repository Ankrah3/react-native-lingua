import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";
import { getLanguagesByOrder } from "@/data/languages";
import useLanguageStore from "@/store/useLanguageStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function formatLearners(count: number): string {
  const formatted = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
  return `${formatted} ${count === 1 ? "learner" : "learners"}`;
}

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();
  const [pendingLanguageId, setPendingLanguageId] = useState(
    selectedLanguageId,
  );
  const [query, setQuery] = useState("");
  const languages = useMemo(() => getLanguagesByOrder(), []);

  useEffect(() => {
    setPendingLanguageId(selectedLanguageId);
  }, [selectedLanguageId]);

  const visibleLanguages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return languages;
    return languages.filter(
      (language) =>
        language.label.toLowerCase().includes(normalized) ||
        language.nativeName.toLowerCase().includes(normalized),
    );
  }, [languages, query]);

  const handleConfirm = () => {
    if (!pendingLanguageId) return;
    setSelectedLanguageId(pendingLanguageId);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-row items-center px-4 pt-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="size-10 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={26} color="#0D132B" />
        </Pressable>

        <Text className="-ml-10 flex-1 text-center font-poppins-semibold text-lg text-text-primary">
          Choose a language
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-2 flex-row items-center gap-2 rounded-full bg-surface px-4 py-3">
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor="#6B7280"
            className="flex-1 font-poppins text-base text-text-primary"
          />
        </View>

        <Text className="mt-6 mb-3 font-poppins-semibold text-base text-text-primary">
          Popular
        </Text>

        {visibleLanguages.length > 0 ? (
          <View className="gap-3">
            {visibleLanguages.map((language) => {
              const selected = pendingLanguageId === language.languageId;
              const disabled = language.comingSoon;
              return (
                <Pressable
                  key={language.languageId}
                  onPress={() =>
                    !disabled && setPendingLanguageId(language.languageId)
                  }
                  disabled={disabled}
                  className={`flex-row items-center rounded-3xl border p-4 ${
                    disabled
                      ? "border-border bg-surface opacity-60"
                      : selected
                        ? "border-lingua-purple bg-[#F5F3FF]"
                        : "border-border bg-white"
                  }`}
                >
                  <Image
                    source={{ uri: language.flag }}
                    className="size-11 rounded-full"
                    contentFit="cover"
                  />

                  <View className="ml-3 flex-1">
                    <Text className="font-poppins-semibold text-base text-text-primary">
                      {language.label}
                    </Text>
                    <Text className="mt-0.5 font-poppins text-sm text-text-secondary">
                      {disabled
                        ? "Coming soon"
                        : formatLearners(language.learners)}
                    </Text>
                  </View>

                  {disabled ? null : selected ? (
                    <View className="size-7 items-center justify-center rounded-full bg-lingua-purple">
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    </View>
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#9CA3AF"
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View className="items-center gap-3 py-10">
            <Text className="font-poppins-semibold text-base text-text-primary">
              No languages found
            </Text>
            <Text className="text-center font-poppins text-sm text-text-secondary">
              We couldn&apos;t find a language matching &quot;{query}
              &quot;.
            </Text>
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Text className="font-poppins-semibold text-sm text-lingua-purple">
                Clear search
              </Text>
            </Pressable>
          </View>
        )}

        <Pressable
          onPress={handleConfirm}
          disabled={!pendingLanguageId}
          className={`mt-6 items-center rounded-3xl py-4 ${
            pendingLanguageId ? "bg-lingua-purple" : "bg-surface"
          }`}
        >
          <Text
            className={`font-poppins-semibold text-base ${
              pendingLanguageId ? "text-white" : "text-text-secondary"
            }`}
          >
            Confirm selection
          </Text>
        </Pressable>

        <View className="-mx-5 mt-8">
          <Image
            source={images.earth}
            className="h-52 w-full"
            contentFit="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
