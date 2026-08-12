import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useLanguageStore from "@/store/useLanguageStore";

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const resetSelectedLanguage = useLanguageStore(
    (s) => s.resetSelectedLanguage,
  );

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
  };

  const handleResetLanguageSelection = async () => {
    await resetSelectedLanguage();
    router.replace("/language");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center gap-4 px-8">
        <Text className="font-poppins-semibold text-xl text-text-primary">
          Profile
        </Text>

        <Pressable
          onPress={handleSignOut}
          className="mt-4 rounded-2xl bg-lingua-purple px-8 py-4"
        >
          <Text className="font-poppins-semibold text-base text-white">
            Sign Out
          </Text>
        </Pressable>

        <Pressable
          onPress={handleResetLanguageSelection}
          className="rounded-2xl border border-red-400 px-8 py-4"
        >
          <Text className="font-poppins-semibold text-base text-red-500">
            Reset language selection (test)
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
