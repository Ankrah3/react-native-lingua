export type LessonStatus = "completed" | "in-progress" | "locked";

export type TodayPlanIcon = "lesson" | "conversation" | "words";

export type TodayPlanItem = {
  id: string;
  lessonId: string | null;
  title: string;
  subtitle: string;
  icon: TodayPlanIcon;
  status: LessonStatus;
};

export type HomeViewModel = {
  languageId: string;
  languageLabel: string;
  languageFlag: string;
  greeting: string;
  streakDays: number;
  dailyGoalXp: number;
  earnedXpToday: number;
  currentUnit: { unitId: string; title: string; order: number } | null;
  currentLesson: { lessonId: string; title: string } | null;
  todayPlan: TodayPlanItem[];
};
