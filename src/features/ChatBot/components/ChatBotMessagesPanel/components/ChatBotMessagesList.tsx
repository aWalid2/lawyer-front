import { TypingIndicator } from "@/components/ui/typing-indicator";
import type { Message } from "@/components/ui/chat-message";
import { ChatBotBubble } from "../../ChatBotBubble";

interface ChatBotMessagesListProps {
  messages: Message[];
  isGenerating: boolean;
}

export const ChatBotMessagesList = ({
  messages,
  isGenerating,
}: ChatBotMessagesListProps) => {
  return (
    <>
      <div className="flex justify-center">
        <span className="rounded-full bg-[#FCFBF8] px-4 py-1 text-xs text-[#A5AFBA]">
          اليوم
        </span>
      </div>

      {messages.map((message) => (
        <ChatBotBubble key={message.id} message={message} />
      ))}

      {isGenerating && <TypingIndicator />}
    </>
  );
};
