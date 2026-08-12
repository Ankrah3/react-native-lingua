
Read AGENTS.md first and follow it strictly.

Implement the bottom tab navigation based on the attached design. Place the bottom-tab routes for Home, Learn, AI Teacher, Chat, and Profile inside the protected `(tabs)` route group so they are only reachable after authentication and language selection guards complete. Keep placeholder screens unchanged.

Build a custom tab bar that keeps an accessible name and `tab` role for each tab, and updates an explicit `selected` state even when the active label is visually hidden. Preserve the active circular indicator and inactive labels. Respect reduced-motion accessibility preferences by disabling the active-circle movement animation when the user's preferences indicate reduced motion.

Do not change the existing root entry flow used by Clerk authentication and language selection; ensure the tab navigator is reachable only after both checks complete rather than exposing `/` prematurely.

@prompt_material/05-home-and-tab-navigation.png