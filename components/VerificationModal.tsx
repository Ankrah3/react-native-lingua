import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onVerified: (code: string) => void;
  title?: string;
  subtitle?: string;
};

export default function VerificationModal({
  visible,
  onClose,
  onVerified,
  title = "Verify your email",
  subtitle = "We've sent a 6-digit code to your email. Enter it below.",
}: Props) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (visible) {
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => refs.current[0]?.focus(), 300);
    }
  }, [visible]);

  function onChangeText(text: string, idx: number) {
    if (!/^\d*$/.test(text)) return;
    const char = text.slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);

    if (char && idx < 5) {
      refs.current[idx + 1]?.focus();
    }

    if (idx === 5 && char) {
      const code = next.join("");
      if (code.length === 6) {
        setTimeout(() => {
          onVerified(code);
        }, 250);
      }
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="bg-white rounded-t-2xl px-6 py-6 shadow-lg">
          <Text className="text-lg font-semibold text-[#0A1B3A]">{title}</Text>
          <Text className="text-sm text-gray-500 mt-2">{subtitle}</Text>

          <View className="flex-row justify-between mt-6 px-2">
            {digits.map((d, i) => (
              <TextInput
                key={i}
                ref={(r) => {
                  refs.current[i] = r;
                }}
                value={d}
                onChangeText={(t) => onChangeText(t, i)}
                keyboardType="number-pad"
                maxLength={1}
                className="w-12 h-14 text-center border border-gray-200 rounded-lg text-lg"
                textContentType="oneTimeCode"
                importantForAutofill="yes"
              />
            ))}
          </View>

          <View className="mt-6 flex-row justify-end">
            <TouchableOpacity onPress={onClose} className="px-4 py-2">
              <Text className="text-[#6C3BFF]">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
