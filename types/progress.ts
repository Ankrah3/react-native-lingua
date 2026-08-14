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

export type LessonListItem = {
  lessonId: string;
  order: number;
  title: string;
  status: LessonStatus;
  durationMinutes: number;
  xpReward: number;
};

export type LessonsViewModel = {
  languageId: string;
  languageLabel: string;
  headerTitle: string;
  unitOrder: number;
  unitCompleted: number;
  unitTotal: number;
  items: LessonListItem[];
};
