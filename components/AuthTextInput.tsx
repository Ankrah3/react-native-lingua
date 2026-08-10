import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
};

export default function AuthTextInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}: Props) {
  return (
    <View>
      <Text className="text-sm text-gray-400 mb-2">{label}</Text>
      <View className="bg-white border border-gray-200 rounded-xl px-4 py-3">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          className="text-base text-[#111827]"
          placeholder={label}
        />
      </View>
    </View>
  );
}
