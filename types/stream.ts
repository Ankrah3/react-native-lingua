export type StreamSessionResponse = {
  apiKey: string;
  userId: string;
  userName: string;
  userImage?: string;
  token: string;
};

export type StreamCallResponse = {
  callId: string;
  callType: string;
  languageId: string;
  lessonId: string;
};

export type AgentSessionResponse = {
  sessionId: string;
};
