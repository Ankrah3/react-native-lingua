Read prompts/prompts/AGENTS.md first and follow it strictly.

Implement the AI Teacher audio lesson screen exactly as shown in the attached design. When the user taps any lesson from the Learn/Lessons screen, open this screen with the selected `lessonId` and validate that the `lessonId` exists in the hardcoded learning data. If the `lessonId` is missing or invalid, render a recoverable error and/or navigate back to Lessons — do not render lesson fields or start the AI teacher session until validation succeeds.

This should be an audio-only experience. Do not implement video calling. Keep the camera area as a visual teacher preview/placeholder only if needed, and focus on audio lesson controls such as mic, subtitles, end call, lesson feedback, teacher response bubble, and session status.

Use assets from the assets folder via the centralized images import and keep everything consistent with the existing design system and bottom tab navigation.

@prompt_material/07-audio-lesson-screen.png