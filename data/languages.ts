import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    languageId: "spanish",
    label: "Spanish",
    nativeName: "Español",
    flag: "https://flagpedia.net/data/flags/w1160/es.webp",
    description: "Beginner-friendly Spanish lessons for everyday conversation.",
    learners: "28.4M learners",
    order: 1,
  },
  {
    code: "fr",
    languageId: "french",
    label: "French",
    nativeName: "Français",
    flag: "https://flagpedia.net/data/flags/h160/fr.webp",
    description: "Build confidence with greetings, travel phrases, and more.",
    learners: "19.4M learners",
    order: 2,
  },
  {
    code: "jp",
    languageId: "japanese",
    label: "Japanese",
    nativeName: "日本語",
    flag: "https://flagpedia.net/data/flags/h160/jp.webp",
    description: "Learn hiragana, katakana, and everyday Japanese phrases.",
    learners: "12.7M learners",
    order: 3,
  },
  {
    code: "kr",
    languageId: "korean",
    label: "Korean",
    nativeName: "한국어",
    flag: "https://flagpedia.net/data/flags/h160/kr.webp",
    description: "Learn hangul, greetings, and everyday Korean phrases.",
    learners: "9.3M learners",
    order: 4,
  },
  {
    code: "de",
    languageId: "german",
    label: "German",
    nativeName: "Deutsch",
    flag: "https://flagpedia.net/data/flags/h160/de.webp",
    description: "Learn everyday greetings, travel phrases, and more.",
    learners: "8.1M learners",
    order: 5,
  },
  {
    code: "cn",
    languageId: "chinese",
    label: "Chinese",
    nativeName: "中文",
    flag: "https://flagpedia.net/data/flags/h160/cn.webp",
    description: "Start with pinyin, basic phrases, and classroom vocabulary.",
    learners: "7.4M learners",
    order: 6,
  },
];

export function getLanguagesByOrder(): Language[] {
  return [...languages].sort((a, b) => a.order - b.order);
}

export function getLanguageById(languageId: string): Language | undefined {
  return languages.find((language) => language.languageId === languageId);
}
