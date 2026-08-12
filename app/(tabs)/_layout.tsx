import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import TabBar from "@/components/TabBar";
import useLanguageStore from "@/store/useLanguageStore";

export default function TabsLayout() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const selectedLanguageId = useLanguageStore((s) => s.selectedLanguageId);
  const hydratedUserId = useLanguageStore((s) => s.hydratedUserId);

  const isHydratedForUser =
    isSignedIn && userId ? hydratedUserId === userId : true;

  if (!isLoaded || !isHydratedForUser) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language" />;
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="ai-teacher" options={{ title: "AI Teacher" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
