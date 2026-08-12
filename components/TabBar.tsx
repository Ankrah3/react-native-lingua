import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  home: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": {
    active: "chatbubble-ellipses",
    inactive: "chatbubble-ellipses-outline",
  },
  chat: { active: "chatbubble", inactive: "chatbubble-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

const INDICATOR_SIZE = 44;
const ACTIVE_COLOR = "#6C4EF5";
const INACTIVE_COLOR = "#6B7280";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const reducedMotion = useReducedMotion();
  const [tabWidth, setTabWidth] = useState(0);
  const indicatorX = useSharedValue(0);

  useEffect(() => {
    const target = state.index * tabWidth;
    indicatorX.value = reducedMotion ? target : withTiming(target, { duration: 220 });
  }, [state.index, tabWidth, reducedMotion, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setTabWidth(event.nativeEvent.layout.width / state.routes.length);
  };

  return (
    <View
      className="flex-row border-t border-border bg-white pt-2"
      style={{ paddingBottom: 20 }}
      onLayout={handleLayout}
    >
      {tabWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            { position: "absolute", top: 4, width: tabWidth, alignItems: "center" },
            indicatorStyle,
          ]}
        >
          <View
            className="rounded-full bg-lingua-purple/10"
            style={{ width: INDICATOR_SIZE, height: INDICATOR_SIZE }}
          />
        </Animated.View>
      ) : null}

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;
        const icons = TAB_ICONS[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: isFocused }}
            className="flex-1 items-center gap-1"
          >
            <Ionicons
              name={isFocused ? icons.active : icons.inactive}
              size={24}
              color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
            <Text
              className={`font-poppins-medium text-[11px] ${
                isFocused ? "text-lingua-purple" : "text-text-secondary"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
