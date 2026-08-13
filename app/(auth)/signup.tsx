import { useAuth, useSignUp } from "@clerk/expo";
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

export default function SignUp() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSignUp = async () => {
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName: firstName.trim() || undefined,
    });

    if (error) {
      setErrorMessage(error.message ?? "Unable to sign up. Please try again.");
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setErrorMessage(
        sendError.message ??
          "Unable to send verification code. Please try again.",
      );
      return;
    }

    setModalOpen(true);
  };

  const handleSocialSignUp = async (
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
          : `Unable to sign up with ${provider}.`,
      );
    }
  };

  const handleVerify = async (code: string) => {
    setErrorMessage(null);

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setErrorMessage(error.message ?? "Unable to verify the code.");
      return;
    }

    // If the signup is not complete yet, fill in any missing required fields
    if (signUp.status !== "complete") {
      const updateParams: Record<string, unknown> = {};
      for (const field of signUp.missingFields) {
        if (field === "first_name") updateParams.firstName = "User";
        else if (field === "last_name") updateParams.lastName = "";
        else if (field === "legal_accepted") updateParams.legalAccepted = true;
        else if (field === "username") {
          updateParams.username = email.split("@")[0];
        }
      }

      if (Object.keys(updateParams).length > 0) {
        const { error: updateError } = await signUp.update(updateParams);
        if (updateError) {
          setErrorMessage(updateError.message ?? "Unable to update sign up.");
          return;
        }
      }
    }

    if (signUp.status !== "complete") {
      setErrorMessage("Unable to complete sign up. Please try again.");
      return;
    }

    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      setErrorMessage(finalizeError.message ?? "Unable to complete sign up.");
      return;
    }

    setModalOpen(false);
    router.replace("/");
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
            Create your account
          </Text>
          <Text className="text-base text-[#6B7280] mt-2">
            Start your language journey today ✨
          </Text>

          <View className="items-center mt-2">
            <Image
              source={images.mascot}
              className="w-[220px] h-[180px] -mb-[30px]"
              style={{ resizeMode: "contain" }}
            />
          </View>

          <View className="-mt-7 space-y-4">
            <AuthTextInput
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
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
            <Text className="mt-1 text-xs text-gray-400">
              Password must be at least 8 characters.
            </Text>
          </View>

          {errorMessage ? (
            <Text className="mt-4 text-sm text-red-500">{errorMessage}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSignUp}
            activeOpacity={0.9}
            className="mt-6 bg-gradient-to-r from-[#6C3BFF] to-[#7B61FF] py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-lg font-medium">Sign Up</Text>
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
              onPress={() => handleSocialSignUp("google")}
            />
            <SocialButton
              className="w-full"
              label="Continue with Facebook"
              icon="facebook"
              onPress={() => handleSocialSignUp("facebook")}
            />
            <SocialButton
              className="w-full"
              label="Continue with Apple"
              icon="apple"
              onPress={() => handleSocialSignUp("apple")}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signin")}
            className="mt-6 items-center"
          >
            <Text className="text-gray-500">
              Already have an account?{" "}
              <Text className="text-[#6C3BFF]">Log in</Text>
            </Text>
          </TouchableOpacity>

          <VerificationModal
            visible={modalOpen}
            onClose={() => setModalOpen(false)}
            onVerified={handleVerify}
            title="Verify your account"
            subtitle="Enter the 6-digit code sent to your email."
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
