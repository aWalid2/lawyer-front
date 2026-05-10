import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "../types/chatT";
import { ChatBubble } from "./ChatBubble";

interface ChatMessagesPanelProps {
  messages: Message[];
}

export const ChatMessagesPanel = ({ messages }: ChatMessagesPanelProps) => {
  return (
    <div className="flex min-h-0 flex-1 rounded-[28px] border border-[#EEE8DC] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <ScrollArea className="h-[calc(100vh-280px)] w-full px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#FCFBF8] px-4 py-1 text-xs text-[#A5AFBA]">
              اليوم
            </span>
          </div>

          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
