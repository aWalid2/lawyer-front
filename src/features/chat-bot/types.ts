import type { Message } from "@/components/ui/chat-message";

export type ChatAttachment = NonNullable<
  Message["experimental_attachments"]
>[number];