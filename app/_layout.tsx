import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import {
  PostHogErrorBoundary,
  PostHogProvider,
  usePostHog,
} from "posthog-react-native";
import { Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { posthog } from "../lib/posthog";
import "../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

function ErrorFallback() {
  return (
    <View>
      <Text>Something went wrong. Please restart the app.</Text>
    </View>
  );
}

function PostHogIdentity() {
  const posthog = usePostHog();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !userId) {
      if (identifiedUserId.current) {
        posthog?.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === userId) return;

    if (identifiedUserId.current) {
      posthog?.reset();
    }

    posthog?.identify(userId, {
      $set: {
        ...(user?.primaryEmailAddress?.emailAddress
          ? { email: user.primaryEmailAddress.emailAddress }
          : {}),
        ...(user?.fullName ? { name: user.fullName } : {}),
      },
    });
    identifiedUserId.current = userId;
  }, [
    isLoaded,
    isSignedIn,
    posthog,
    user?.fullName,
    user?.primaryEmailAddress?.emailAddress,
    userId,
  ]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogErrorBoundary fallback={ErrorFallback}>
            <PostHogIdentity />
            <Stack screenOptions={{ headerShown: false }} />
          </PostHogErrorBoundary>
        </PostHogProvider>
      ) : (
        <Stack screenOptions={{ headerShown: false }} />
      )}
    </ClerkProvider>
  );
}
