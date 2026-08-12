import { useAuth } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C3BFF" />
      </View>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="font-poppins-semibold text-4xl text-lingua-purple">
        Lingua
      </Text>

      <Link href="/language" asChild>
        <Pressable className="mt-10 rounded-2xl border border-lingua-purple px-8 py-4">
          <Text className="font-poppins-semibold text-base text-lingua-purple">
            Choose a language
          </Text>
        </Pressable>
      </Link>

      {isSignedIn ? (
        <Pressable
          onPress={handleSignOut}
          className="mt-4 rounded-2xl bg-lingua-purple px-8 py-4"
        >
          <Text className="font-poppins-semibold text-base text-white">
            Sign Out
          </Text>
        </Pressable>
      ) : (
        <Link href="/(auth)/signin" asChild>
          <Pressable className="mt-4 rounded-2xl bg-lingua-purple px-8 py-4">
            <Text className="font-poppins-semibold text-base text-white">
              Sign In
            </Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}
