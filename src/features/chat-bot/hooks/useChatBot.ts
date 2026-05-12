import { useEffect, useRef, useState } from "react";
import type { Message } from "@/components/ui/chat-message";
import { generateAssistantReply } from "../services/chatBotResponse";
import type { ChatAttachment } from "../types";

const fileToDataUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const mapFilesToAttachments = async (files?: FileList) => {
  if (!files?.length) {
    return undefined;
  }

  const attachments = await Promise.all(
    Array.from(files).map(async (file) => ({
      name: file.name,
      contentType: file.type,
      url: await fileToDataUrl(file),
    })),
  );

  return attachments as ChatAttachment[];
};

export const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const pushAssistantReply = (
    prompt: string,
    attachments?: ChatAttachment[],
  ) => {
    setIsGenerating(true);

    timeoutRef.current = window.setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: generateAssistantReply(prompt, attachments?.length ?? 0),
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsGenerating(false);
      timeoutRef.current = null;
    }, 700);
  };

  const submitMessage = async (text: string, files?: FileList) => {
    const trimmedText = text.trim();
    if (!trimmedText && !files?.length) {
      return;
    }

    const attachments = await mapFilesToAttachments(files);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedText || "تم إرسال مرفقات للمراجعة.",
      createdAt: new Date(),
      experimental_attachments: attachments,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    pushAssistantReply(trimmedText || "يرجى مراجعة المرفقات.", attachments);
  };

  const handleAppend = ({ content }: { role: "user"; content: string }) => {
    void submitMessage(content);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSend = async () => {
    await submitMessage(input);
  };

  const handleStop = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsGenerating(false);
  };

  return {
    messages,
    input,
    isGenerating,
    handleAppend,
    handleInputChange,
    handleSend,
    handleStop,
  };
};