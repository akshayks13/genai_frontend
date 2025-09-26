import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_PROMPT_URL

const apiClient = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export const sendPrompt = ({ prompt, temperature, maxTokens, responseMimeType } = {}) =>
  apiClient.post('/prompt', { prompt, temperature, maxTokens, responseMimeType });

export const learningPrompt = (prompt, opts) => sendPrompt({ prompt, ...opts });
export const interviewPrompt = (prompt, opts) => sendPrompt({ prompt, ...opts });
export const mentorshipPrompt = (prompt, opts) => sendPrompt({ prompt, ...opts });
export const explorePrompt = (prompt, opts) => sendPrompt({ prompt, ...opts });
export const roadmapPrompt = (prompt, opts) => sendPrompt({ prompt, ...opts });

export const generateContent = sendPrompt;
