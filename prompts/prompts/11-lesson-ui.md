
Read AGENTS.md first and follow it strictly.

Implement the Lessons screen exactly as shown in the attached design. Use the selected language from Zustand + AsyncStorage and display the matching units/lessons from the hardcoded learning data.

Move any lesson expansion/computation out of the render flow; prepare immutable lesson fixtures in `data/lessons.ts` before building the screen. If a selected language has fewer than two lessons, provide at least five additional lessons in the same structure and style so the UI demonstrates scrolling and progression. If a language has no lessons available, render a clear recoverable empty state with a call-to-action to add or select another language.

For status, use a single shared status source keyed by `lessonId` used by both Home and Lessons; do not rely on component-local ad-hoc mock values for status. Either consume the shared status to indicate `completed` / `in-progress` / `locked`, or keep status as static fixture data but do not mix local mocks that diverge from Home progress.

Use assets from the assets folder and for each lesson selection use its respective image. If any image is missing, use a suitable placeholder from Unsplash or Picsum.

@prompt_material/06-lesson-screen.png