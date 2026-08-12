import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import useLanguageStore from "@/store/useLanguageStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-3xl font-bold text-[#0A1B3A]">
          Choose a language
        </Text>
        <Text className="text-base text-[#6B7280] mt-2">
          Pick one language to start your personalized journey.
        </Text>

        <View className="my-6 rounded-[28px] bg-[#F6F8FF] p-6 items-center">
          <Image
            source={images.earth}
            className="h-48 w-full"
            contentFit="contain"
          />
        </View>

        <View className="space-y-4">
          {languages.map((language) => {
            const selected = selectedLanguageId === language.id;
            return (
              <Pressable
                key={language.id}
                onPress={() => setSelectedLanguageId(language.id)}
                className={`rounded-3xl border p-5 ${
                  selected
                    ? "border-lingua-purple bg-[#F2EDFF]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Text className="text-xl font-semibold text-[#0A1B3A]">
                  {language.label}
                </Text>
                <Text className="mt-1 text-sm text-[#6B7280]">
                  {language.nativeName}
                </Text>
                <Text className="mt-3 text-sm text-[#4B5563]">
                  {language.description}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => {
            if (selectedLanguageId) {
              router.replace("/");
            }
          }}
          disabled={!selectedLanguageId}
          className={`mt-8 rounded-2xl py-5 items-center ${
            selectedLanguageId ? "bg-lingua-purple" : "bg-gray-200"
          }`}
        >
          <Text
            className={`font-poppins-semibold text-base ${
              selectedLanguageId ? "text-white" : "text-gray-500"
            }`}
          >
            Continue
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
