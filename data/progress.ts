import { getLessonsByLanguage } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import type { Language } from "@/types/learning";
import type { HomeViewModel, LessonStatus, TodayPlanItem } from "@/types/progress";

/**
 * Static fixture standing in for real lesson-completion tracking. Keyed by
 * `lessonId` so Home and the Lessons screen can share the exact same status
 * source instead of diverging local mocks.
 */
const completedLessonIds = new Set<string>([
  "spanish-basics-1",
  "spanish-basics-2",
  "french-basics-1",
  "french-basics-2",
  "german-basics-1",
  "german-basics-2",
  "chinese-basics-1",
  "chinese-basics-2",
]);

export function getLessonStatus(
  lessonId: string,
  isCurrent: boolean,
): LessonStatus {
  if (completedLessonIds.has(lessonId)) return "completed";
  return isCurrent ? "in-progress" : "locked";
}

function stripGreetingPunctuation(text: string): string {
  return text.replace(/[¡！!？?]/g, "").trim();
}

export function buildHomeViewModel(language: Language): HomeViewModel {
  const lessons = getLessonsByLanguage(language.languageId);
  const currentIndex = lessons.findIndex(
    (lesson) => !completedLessonIds.has(lesson.lessonId),
  );
  const current =
    currentIndex >= 0 ? lessons[currentIndex] : lessons[lessons.length - 1];
  const lastCompleted =
    currentIndex > 0 ? lessons[currentIndex - 1] : lessons[0];
  const currentUnit = current ? getUnitById(current.unitId) : undefined;

  const todayPlan: TodayPlanItem[] = [];

  if (lastCompleted) {
    todayPlan.push({
      id: `${lastCompleted.lessonId}-lesson`,
      lessonId: lastCompleted.lessonId,
      title: "Lesson",
      subtitle: lastCompleted.description,
      icon: "lesson",
      status: "completed",
    });
  }

  if (current) {
    todayPlan.push({
      id: `${current.lessonId}-conversation`,
      lessonId: current.lessonId,
      title: "AI Conversation",
      subtitle: current.goal,
      icon: "conversation",
      status: getLessonStatus(current.lessonId, true),
    });

    todayPlan.push({
      id: `${current.unitId}-words`,
      lessonId: null,
      title: "New words",
      subtitle: `${current.vocabulary.length} words`,
      icon: "words",
      status: "locked",
    });
  }

  const greetingPhrase = lessons[0]?.phrases[0]?.text ?? "Hello!";

  return {
    languageId: language.languageId,
    languageLabel: language.label,
    languageFlag: language.flag,
    greeting: stripGreetingPunctuation(greetingPhrase),
    streakDays: 12,
    dailyGoalXp: 20,
    earnedXpToday: 15,
    currentUnit: currentUnit
      ? {
          unitId: currentUnit.unitId,
          title: currentUnit.title,
          order: currentUnit.order,
        }
      : null,
    currentLesson: current
      ? { lessonId: current.lessonId, title: current.title }
      : null,
    todayPlan,
  };
}
