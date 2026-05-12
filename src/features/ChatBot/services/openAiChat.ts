import api from "@/lib/api";
import type { OpenAiChatRequest, OpenAiChatResponse } from "../types";

export const openAiChat = async (
  prompt: string,
): Promise<OpenAiChatResponse> => {
  const payload: OpenAiChatRequest = {
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  };

  const { data } = await api.post("/open-ai/chat", payload);
  return data;
};