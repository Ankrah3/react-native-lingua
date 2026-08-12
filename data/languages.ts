export type Language = {
  id: string;
  label: string;
  nativeName: string;
  description: string;
};

export const languages: Language[] = [
  {
    id: "spanish",
    label: "Spanish",
    nativeName: "Español",
    description: "Beginner-friendly Spanish lessons for everyday conversation.",
  },
  {
    id: "french",
    label: "French",
    nativeName: "Français",
    description: "Build confidence with greetings, travel phrases, and more.",
  },
  {
    id: "chinese",
    label: "Chinese",
    nativeName: "中文",
    description: "Start with pinyin, basic phrases, and classroom vocabulary.",
  },
];
