export type Language = {
  code: string;
  languageId: string;
  label: string;
  nativeName: string;
  flag: string;
  description: string;
  learners: number;
  order: number;
  comingSoon?: boolean;
};

export type Unit = {
  unitId: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
};

export type VocabularyItem = {
  term: string;
  translation: string;
  romanization?: string;
};

export type Phrase = {
  text: string;
  translation: string;
  romanization?: string;
};

export type ActivityType =
  | "multiple-choice"
  | "match"
  | "fill-blank"
  | "repeat"
  | "listen";

export type Activity = {
  activityId: string;
  lessonId: string;
  order: number;
  type: ActivityType;
  prompt?: string;
};

export type LessonType = "audio" | "video" | "chat" | "review";

export type Lesson = {
  lessonId: string;
  unitId: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  type: LessonType;
  durationMinutes: number;
  xpReward: number;
  goal: string;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: string;
};
