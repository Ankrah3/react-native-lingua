import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return null;
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Clerk SecureStore getToken error:", error);
      try {
        await SecureStore.deleteItemAsync(key);
      } catch {
        // ignore delete failure
      }
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Clerk SecureStore saveToken error:", error);
    }
  },
  async clearToken(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("Clerk SecureStore clearToken error:", error);
    }
  },
};
