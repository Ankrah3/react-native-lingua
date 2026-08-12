import { useAuth, useSignIn } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthTextInput from "../../components/AuthTextInput";
import SocialButton from "../../components/SocialButton";
import VerificationModal from "../../components/VerificationModal";
import { images } from "../../constants/images";

export default function SignIn() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSignIn = async () => {
    setErrorMessage(null);

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      setErrorMessage(error.message ?? "Unable to sign in. Please try again.");
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setErrorMessage(finalizeError.message ?? "Unable to complete sign in.");
        return;
      }
      router.replace("/");
      return;
    }

    if (
      signIn.status === "needs_client_trust" ||
      signIn.status === "needs_second_factor"
    ) {
      const { error: sendError } = await signIn.mfa.sendEmailCode?.();
      if (sendError) {
        setErrorMessage(
          sendError.message ?? "Unable to send the verification code.",
        );
        return;
      }

      setModalOpen(true);
      return;
    }

    setErrorMessage(
      "Unable to sign in. Please check your credentials and try again.",
    );
  };

  const handleSocialSignIn = async (
    provider: "google" | "facebook" | "apple",
  ) => {
    setErrorMessage(null);

    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: `oauth_${provider}`,
      });

      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : `Unable to sign in with ${provider}.`,
      );
    }
  };

  const handleVerify = async (code: string) => {
    setErrorMessage(null);

    const { error } = await signIn.mfa.verifyEmailCode({ code });
    if (error) {
      setErrorMessage(error.message ?? "Unable to verify the code.");
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setErrorMessage(finalizeError.message ?? "Unable to complete sign in.");
        return;
      }
      setModalOpen(false);
      router.replace("/");
      return;
    }

    setErrorMessage("Verification succeeded but sign in is not complete.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 32,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-[#0A1B3A] mt-2">
            Sign in
          </Text>
          <Text className="text-base text-[#6B7280] mt-2">
            Welcome back — ready to learn?
          </Text>

          <View className="items-center mt-2">
            <Image
              source={images.mascot}
              style={{
                width: 220,
                height: 180,
                resizeMode: "contain",
                marginBottom: -30,
              }}
            />
          </View>

          <View className="mt-4 space-y-4" style={{ marginTop: -28 }}>
            <AuthTextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <AuthTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {errorMessage ? (
            <Text className="mt-4 text-sm text-red-500">{errorMessage}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity={0.9}
            className="mt-6 bg-gradient-to-r from-[#6C3BFF] to-[#7B61FF] py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-lg font-medium">Sign In</Text>
          </TouchableOpacity>

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-3 text-gray-400">or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <View className="space-y-3">
            <SocialButton
              className="w-full"
              label="Continue with Google"
              icon="google"
              onPress={() => handleSocialSignIn("google")}
            />
            <SocialButton
              className="w-full"
              label="Continue with Facebook"
              icon="facebook"
              onPress={() => handleSocialSignIn("facebook")}
            />
            <SocialButton
              className="w-full"
              label="Continue with Apple"
              icon="apple"
              onPress={() => handleSocialSignIn("apple")}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            className="mt-6 items-center"
          >
            <Text className="text-gray-500">
              {"Don't have an account? "}
              <Text className="text-[#6C3BFF]">Sign up</Text>
            </Text>
          </TouchableOpacity>

          <VerificationModal
            visible={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            onVerified={handleVerify}
            title="Verify your account"
            subtitle="Enter the 6-digit code sent to your email."
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
