// The Stream user id the Python Vision Agent joins calls as. Not a secret -
// shared by the server (to add it as a call member) and the client (to
// detect when it has actually joined, see hooks/useVisionAgentSession.ts).
// Must match `agent_user=User(..., id=...)` in vision-agent/agent.py.
export const AI_TEACHER_USER_ID = "ai-teacher";
