Read AGENTS.md first and follow it strictly.

Replace the current mocked auth flow with Clerk Expo JavaScript custom flow using `useSignIn` and `useSignUp`. Keep the existing screens and navigation intact. Add a root `ClerkProvider` (Expo) and configure a `tokenCache`; require the `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in the environment. Keep all secret keys server-side only.

Implement email-based Sign Up/Sign In, and social auth where supported, using the Clerk client-side flows and verification handling provided by Clerk. Preserve the screen designs exactly.

Routing and guard behavior:

- Wait for both Clerk authentication state and persisted language-state hydration before performing any routing decisions on the root route.
- If the user is not authenticated, route them to `/onboarding`.
- If the user is authenticated but has no persisted selected language, route them to the language selection route (documented elsewhere).
- If the user is authenticated and has a persisted language, route them to the protected home route (`/`).

Do not change visual layout. If changes are required for integration, ask before implementation.
---

(Here paste the latest [**Clerk documentation**](https://clerk.com/docs/expo/getting-started/quickstart))