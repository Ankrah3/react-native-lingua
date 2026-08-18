import { useAuth } from "@clerk/expo";
import { Image } from "@/lib/image";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { getLanguageById } from "@/data/languages";
import useLanguageStore from "@/store/useLanguageStore";

export default function Index() {
  const router = useRouter();
  const { isLoaded, isSignedIn, userId } = useAuth();

  const selectedLanguageId = useLanguageStore((s) => s.selectedLanguageId);
  const hydratedUserId = useLanguageStore((s) => s.hydratedUserId);
  const hydrate = useLanguageStore((s) => s.hydrate);

  const selectedLanguage = useMemo(
    () => (selectedLanguageId ? getLanguageById(selectedLanguageId) : undefined),
    [selectedLanguageId],
  );

  const isHydratedForUser =
    isSignedIn && userId ? hydratedUserId === userId : true;

  useEffect(() => {
    if (isLoaded && isSignedIn && userId && hydratedUserId !== userId) {
      hydrate(userId);
    }
  }, [isLoaded, isSignedIn, userId, hydratedUserId, hydrate]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId || hydratedUserId !== userId) {
      return;
    }
    router.replace(selectedLanguageId ? "/(tabs)/home" : "/language");
  }, [isLoaded, isSignedIn, userId, hydratedUserId, selectedLanguageId, router]);

  // Signed-in users are always redirected above (to /language or /(tabs)/home),
  // so the content below only ever renders for signed-out visitors.
  if (!isLoaded || !isHydratedForUser || isSignedIn) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C3BFF" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="font-poppins-semibold text-4xl text-lingua-purple">
        Lingua
      </Text>

      {selectedLanguage ? (
        <View className="mt-6 flex-row items-center gap-2 rounded-full bg-surface px-4 py-2">
          <Image
            source={{ uri: selectedLanguage.flag }}
            className="size-6 rounded-full"
            contentFit="cover"
          />
          <Text className="font-poppins-semibold text-sm text-text-primary">
            Learning {selectedLanguage.label}
          </Text>
        </View>
      ) : null}

      <Link href="/language" asChild>
        <Pressable className="mt-10 rounded-2xl border border-lingua-purple px-8 py-4">
          <Text className="font-poppins-semibold text-base text-lingua-purple">
            Choose a language
          </Text>
        </Pressable>
      </Link>

      <Link href="/(auth)/signin" asChild>
        <Pressable className="mt-4 rounded-2xl bg-lingua-purple px-8 py-4">
          <Text className="font-poppins-semibold text-base text-white">
            Sign In
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
