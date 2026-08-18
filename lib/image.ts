import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";

// expo-image's Image is a separate native view from react-native's core
// Image, so NativeWind doesn't auto-patch it. Wrapping it with `styled`
// lets `className` (w-*, h-*, size-*, etc.) work like on any other component.
export const Image = styled(ExpoImage);
