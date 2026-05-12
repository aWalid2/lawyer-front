import { useEffect, useRef, useState } from "react";
import type { Message } from "@/components/ui/chat-message";
import { toast } from "sonner";
import type { ChatAttachment } from "../types";
import { openAiChat } from "../services/openAiChat";

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
  const requestSequenceRef = useRef(0);

  useEffect(() => {
    return () => {
      requestSequenceRef.current += 1;
    };
  }, []);

  const pushAssistantReply = async (
    prompt: string,
    attachments?: ChatAttachment[],
  ) => {
    setIsGenerating(true);
    const requestId = requestSequenceRef.current + 1;
    requestSequenceRef.current = requestId;

    try {
      const response = await openAiChat(prompt);

      if (requestSequenceRef.current !== requestId) {
        return;
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          response.message ||
          `لم يتم استلام رد من الخادم.${
            attachments?.length
              ? `\n\nتم استلام ${attachments.length} مرفق في الرسالة.`
              : ""
          }`,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      if (requestSequenceRef.current === requestId) {
        toast.error(
          error?.response?.data?.message ||
            "حدث خطأ أثناء التواصل مع المساعد الذكي",
        );
      }
    } finally {
      if (requestSequenceRef.current === requestId) {
        setIsGenerating(false);
      }
    }
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
    await pushAssistantReply(
      trimmedText || "يرجى مراجعة المرفقات.",
      attachments,
    );
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
    requestSequenceRef.current += 1;
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