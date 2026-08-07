import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 px-8">
      <Text className="h2 text-center text-lingua-purple">Lingua</Text>
      <Link href="/onboarding" asChild>
        <Pressable className="rounded-2xl bg-lingua-purple px-7 py-4 active:bg-lingua-deep-purple">
          <Text className="font-poppins-semibold text-base text-white">View onboarding</Text>
        </Pressable>
      </Link>
    </View>
  );
}
