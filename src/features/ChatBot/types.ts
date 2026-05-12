import type { Message } from "@/components/ui/chat-message";

export type ChatAttachment = NonNullable<
  Message["experimental_attachments"]
>[number];

export interface OpenAiChatRequest {
  messages: Array<{
    role: "system";
    content: string;
  }>;
}

export interface OpenAiChatResponse {
  message: string;
  tokens_used: number;
}