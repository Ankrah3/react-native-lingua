
Read AGENTS.md first and follow it strictly.

Before implementing the Home screen, define a typed Home data contract (shared view model) that exposes current lesson, per-lesson progress, and today's plan keyed by stable `lessonId` values from the content model described in `06-content-system.md`. The Home screen must consume this shared data model (in-memory or derived) rather than inventing incompatible fields. Align `currentLesson`, `progress`, and `todayPlan` fields with the lesson/content model so Home and Lessons share a consistent view of progress.

Implement the Home screen UI exactly as shown in the attached design with spacing structure and such neatly exactly done. Display the logged-in user information from Clerk and the selected language from Zustand + AsyncStorage.

Use the learning data from `data/*` to show current lesson, progress, and today’s plan.

Use assets from the assets folder via the centralized images import. If any image is missing, use a suitable placeholder from Unsplash or Picsum.

@prompt_material/05-home-and-tab-navigation.png