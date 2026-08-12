import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  icon: "google" | "facebook" | "apple";
  className?: string;
  onPress?: () => void;
};

const ICON_NAMES: Record<
  Props["icon"],
  React.ComponentProps<typeof FontAwesome>["name"]
> = {
  google: "google",
  facebook: "facebook",
  apple: "apple",
};

export default function SocialButton({ label, icon, className = "", onPress }: Props) {
  const circleStyle = {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  } as const;

  // Simple brand-like tints for each provider
  const bgColor =
    icon === "google" ? "#FFFFFF" : icon === "facebook" ? "#1877F2" : "#000000";
  const iconColor =
    icon === "facebook" ? "#FFFFFF" : icon === "google" ? "#DB4437" : "#FFFFFF";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        "flex-row items-center bg-white border border-gray-200 rounded-xl py-3 px-4 " +
        className
      }
      activeOpacity={0.8}
    >
      <View style={{ ...circleStyle, backgroundColor: bgColor }}>
        <FontAwesome name={ICON_NAMES[icon]} size={20} color={iconColor} />
      </View>

      <Text className="text-base text-[#111827]">{label}</Text>
    </TouchableOpacity>
  );
}
