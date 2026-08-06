/**
 * Design values for places that need a value outside a NativeWind class
 * (for example, status-bar configuration or icon libraries).
 *
 * NativeWind classes are defined from the same values in `theme/tokens.css`.
 */
export const colors = {
  purple: "#6C4EF5",
  deepPurple: "#5B3BF6",
  blue: "#4D8BFF",
  green: "#21C16B",
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",
  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export const typography = {
  h1: { fontSize: 32, lineHeight: 38.4, fontFamily: "Poppins-Bold" },
  h2: { fontSize: 24, lineHeight: 31.2, fontFamily: "Poppins-SemiBold" },
  h3: { fontSize: 20, lineHeight: 26, fontFamily: "Poppins-SemiBold" },
  h4: { fontSize: 16, lineHeight: 22.4, fontFamily: "Poppins-Medium" },
  bodyLarge: { fontSize: 16, lineHeight: 25.6, fontFamily: "Poppins-Regular" },
  bodyMedium: { fontSize: 14, lineHeight: 22.4, fontFamily: "Poppins-Regular" },
  bodySmall: { fontSize: 13, lineHeight: 20.8, fontFamily: "Poppins-Regular" },
  caption: { fontSize: 11, lineHeight: 15.4, fontFamily: "Poppins-Regular" },
} as const;

export const fontFamilies = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;
