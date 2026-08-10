import { useRouter } from "expo-router";
import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
          </View>

          <TouchableOpacity
            onPress={() => setModalOpen(true)}
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
            />
            <SocialButton
              className="w-full"
              label="Continue with Facebook"
              icon="facebook"
            />
            <SocialButton
              className="w-full"
              label="Continue with Apple"
              icon="apple"
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            className="mt-6 items-center"
          >
            <Text className="text-gray-500">
              Don&apos;t have an account?{" "}
              <Text className="text-[#6C3BFF]">Sign up</Text>
            </Text>
          </TouchableOpacity>

          <VerificationModal
            visible={modalOpen}
            onClose={() => setModalOpen(false)}
            onVerified={() => {
              setModalOpen(false);
              router.replace("/");
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
