import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    unitId: "spanish-basics",
    languageId: "spanish",
    title: "Basics",
    description: "Core words and phrases to get you talking.",
    order: 1,
  },
  {
    unitId: "spanish-greetings",
    languageId: "spanish",
    title: "Greetings & Introductions",
    description: "Say hello, introduce yourself, and be polite.",
    order: 2,
  },
  {
    unitId: "spanish-travel",
    languageId: "spanish",
    title: "Travel Essentials",
    description: "Useful phrases for getting around and ordering.",
    order: 3,
  },

  // French
  {
    unitId: "french-basics",
    languageId: "french",
    title: "Basics",
    description: "Core words and phrases to get you talking.",
    order: 1,
  },
  {
    unitId: "french-greetings",
    languageId: "french",
    title: "Greetings & Introductions",
    description: "Say hello, introduce yourself, and be polite.",
    order: 2,
  },
  {
    unitId: "french-travel",
    languageId: "french",
    title: "Travel Essentials",
    description: "Useful phrases for getting around and ordering.",
    order: 3,
  },

  // Chinese
  {
    unitId: "chinese-basics",
    languageId: "chinese",
    title: "Basics",
    description: "Core words and phrases to get you talking.",
    order: 1,
  },
  {
    unitId: "chinese-greetings",
    languageId: "chinese",
    title: "Greetings & Introductions",
    description: "Say hello, introduce yourself, and be polite.",
    order: 2,
  },
  {
    unitId: "chinese-classroom",
    languageId: "chinese",
    title: "Classroom Essentials",
    description: "Useful words and phrases for learning together.",
    order: 3,
  },

  // German
  {
    unitId: "german-basics",
    languageId: "german",
    title: "Basics",
    description: "Core words and phrases to get you talking.",
    order: 1,
  },
  {
    unitId: "german-greetings",
    languageId: "german",
    title: "Greetings & Introductions",
    description: "Say hello, introduce yourself, and be polite.",
    order: 2,
  },
  {
    unitId: "german-travel",
    languageId: "german",
    title: "Travel Essentials",
    description: "Useful phrases for getting around and ordering.",
    order: 3,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((unit) => unit.unitId === unitId);
}
