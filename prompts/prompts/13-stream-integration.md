
Read AGENTS.md first and follow it strictly.

Use the installed GetStream agent skills and the Stream docs to implement Stream audio call setup for the selected lesson flow. When a user taps a lesson, keep the existing Audio Lesson screen UI and add the ability to start, join, mute/unmute, and end an audio-only Stream call.

Stream and server rules:

- Derive the authoritative language for the call from the selected lesson's `languageId` (the lesson record) rather than using an independently-selected language on the client. Validate that the selected language (if supplied) matches the lesson language and otherwise derive it from the lesson record and pass that single trusted value to the agent and audio UI.
- Implement Expo API routes for Stream token generation and call creation that authenticate via the server-side Clerk session — reject unauthenticated requests. Derive the Stream user identity exclusively from the authenticated `userId` on the server (do not accept client-provided user identifiers). Validate `lessonId` and `languageId` before issuing tokens or creating calls and bind the resulting Stream user and call to the authenticated user.
- Define a deterministic, server-owned Stream call identity for each call (for example a stable ID derived from `userId`, `lessonId`, language, and a session id) and return a single unchanged `{ type, id }` pair. Repeated requests or double taps should return the existing call instead of creating parallel calls.

Preserve the existing UI and lesson data. Add clear loading, joined, error, muted, connecting, and ended states and user info on the audio UI.