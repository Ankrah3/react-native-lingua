import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 px-10 pt-8 pb-5">
        <View className="flex-row items-center justify-center gap-2">
          <Image
            source={images.mascotLogo}
            className="size-13"
            contentFit="contain"
          />
          <Text className="font-poppins-semibold text-[39px] leading-[47px] tracking-[-1px] text-text-primary">
            lingua
          </Text>
        </View>

        <View className="mt-4 mb-20">
          <Text className="font-poppins-semibold text-[38px] leading-[50px] tracking-[-1.2px] text-text-primary">
            Your AI language{"\n"}
            <Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className=" font-poppins text-[17px] leading-[31px] text-text-secondary">
            Real conversations, personalized{"\n"}
            lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Graphic area: Hello! raised above the backpack/body, level with
            ¡Hola! on the opposite side, 你好! on the right mid-height. */}
        <View className="relative flex-1 items-center justify-center pb-4">
          {/* Bubble 1 - Hello!, far left, raised to clear the backpack */}
          <View
            style={{
              position: "absolute",
              left: -48,
              top: -55,
              zIndex: 10,
              transform: [{ rotate: "-7deg" }],
            }}
            className="rounded-[22px] bg-[#EBF5FF] px-8 py-5"
          >
            <Text className="font-poppins-medium text-[24px] text-text-primary">
              Hello!
            </Text>
          </View>

          {/* Bubble 2 - ¡Hola!, raised further up, roughly centered/right */}
          <View
            style={{
              position: "absolute",
              right: -34,
              top: -78,
              zIndex: 10,
              transform: [{ rotate: "10deg" }],
            }}
            className="rounded-[22px] bg-[#F5F3FF] px-8 py-5"
          >
            <Text className="font-poppins-medium text-[24px] text-lingua-purple">
              ¡Hola!
            </Text>
          </View>

          {/* Bubble 3 - 你好!, right side, mid-height, clear of the button */}
          <View
            style={{
              position: "absolute",
              right: -20,
              top: 40,
              zIndex: 10,
              transform: [{ rotate: "9deg" }],
            }}
            className="rounded-[22px] bg-[#FFF2EC] px-6 py-4"
          >
            <Text className="font-poppins-medium text-[23px] text-[#FF5A36]">
              你好!
            </Text>
          </View>

          {/* Mascot: unchanged size */}
          <Image
            source={images.mascotWelcome}
            className="-mt-4 mb-16 h-[320px] w-full"
            contentFit="contain"
            style={{ zIndex: 1 }}
          />
        </View>

        <Pressable className="flex-row items-center justify-center gap-3 rounded-[23px] bg-lingua-purple py-6 active:bg-lingua-deep-purple">
          <Text className="font-poppins-semibold text-[24px] text-white">
            Get Started
          </Text>
          <Ionicons name="chevron-forward" size={31} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
