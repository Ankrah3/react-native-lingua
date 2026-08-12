Read AGENTS.md first and follow it strictly.

Implement the language selection screen UI based on the attached design. Use the hardcoded languages from `data/languages.ts` and the existing NativeWind/global.css design utilities.

Replace "See all languages" with a confirmation button. The confirmation button must commit the selected `languageId`, remain disabled until a language is selected, persist that `languageId` (Zustand + AsyncStorage or equivalent), and then navigate to the documented success route (the guarded home flow). Ensure Prompt 08 consumes the same persisted `languageId` and records onboarding completion before the home-route guard executes.

Use the earth image from the assets folder properly and add a link on the home screen route (`/`) to navigate to the language selection screen route.

@prompt_material/04-language-selection-screen.png