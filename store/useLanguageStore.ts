import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type LanguageState = {
  selectedLanguageId: string | null;
  userId: string | null;
  hydratedUserId: string | null;
  hydrate: (userId: string) => Promise<void>;
  setSelectedLanguageId: (languageId: string) => Promise<void>;
  resetSelectedLanguage: () => Promise<void>;
};

const storageKeyForUser = (userId: string) => `selected_language_${userId}`;

const useLanguageStore = create<LanguageState>((set, get) => ({
  selectedLanguageId: null,
  userId: null,
  hydratedUserId: null,

  hydrate: async (userId) => {
    let storedLanguageId: string | null = null;
    try {
      storedLanguageId = await AsyncStorage.getItem(storageKeyForUser(userId));
    } catch {
      storedLanguageId = null;
    }
    set({
      userId,
      selectedLanguageId: storedLanguageId,
      hydratedUserId: userId,
    });
  },

  setSelectedLanguageId: async (languageId) => {
    const { userId } = get();
    set({ selectedLanguageId: languageId });
    if (!userId) return;
    try {
      await AsyncStorage.setItem(storageKeyForUser(userId), languageId);
    } catch {
      // ignore persistence failures
    }
  },

  resetSelectedLanguage: async () => {
    const { userId } = get();
    set({ selectedLanguageId: null });
    if (!userId) return;
    try {
      await AsyncStorage.removeItem(storageKeyForUser(userId));
    } catch {
      // ignore persistence failures
    }
  },
}));

export default useLanguageStore;
