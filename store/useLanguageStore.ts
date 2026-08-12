import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const safeStorage = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch {
      // ignore
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
};

export type LanguageState = {
  selectedLanguageId: string | null;
  setSelectedLanguageId: (languageId: string) => void;
  clearSelectedLanguageId: () => Promise<void>;
};

const STORAGE_KEY = "lingua-language";

const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      setSelectedLanguageId: (languageId) =>
        set({ selectedLanguageId: languageId }),
      clearSelectedLanguageId: async () => {
        await safeStorage.removeItem(STORAGE_KEY);
        set({ selectedLanguageId: null });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ selectedLanguageId: state.selectedLanguageId }),
    },
  ),
);

export default useLanguageStore;
