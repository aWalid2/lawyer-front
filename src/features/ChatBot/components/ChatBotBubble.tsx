import { CopyButton } from "@/components/ui/copy-button";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import type { Message } from "@/components/ui/chat-message";

interface ChatBotBubbleProps {
  message: Message;
}

const formatMessageTime = (createdAt?: Date) => {
  if (!createdAt) {
    return "";
  }

  return createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const ChatBotBubble = ({ message }: ChatBotBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[520px]">
        <div
          className={`rounded-[16px] px-4 py-3 text-sm leading-7 shadow-sm ${
            isUser ? "bg-[#3B496D] text-white" : "bg-[#E7D0A2] text-[#3F3421]"
          }`}
        >
          <MarkdownRenderer>{message.content}</MarkdownRenderer>

          {!isUser && (
            <div className="mt-3 flex justify-end">
              <CopyButton content={message.content} copyMessage="تم نسخ الرد" />
            </div>
          )}
        </div>

        <p
          className={`mt-1 text-[11px] text-[#B1BAC5] ${
            isUser ? "text-left" : "text-right"
          }`}
        >
          اليوم {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
};
