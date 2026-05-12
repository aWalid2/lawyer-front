import { ScrollArea } from "@/components/ui/scroll-area";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import type { Message } from "@/components/ui/chat-message";
import { CHAT_BOT_PROMPT_SUGGESTIONS } from "../services/chatBotResponse";
import { ChatBotBubble } from "./ChatBotBubble";

interface ChatBotMessagesPanelProps {
  messages: Message[];
  isGenerating: boolean;
  onSuggestionSelect: (prompt: string) => void;
}

export const ChatBotMessagesPanel = ({
  messages,
  isGenerating,
  onSuggestionSelect,
}: ChatBotMessagesPanelProps) => {
  return (
    <div className="flex min-h-0 flex-1 rounded-[28px] border border-[#EEE8DC] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <ScrollArea className="h-[calc(100vh-360px)] w-full px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {messages.length === 0 ? (
            <div className="space-y-5 pt-8">
              <div className="flex justify-center">
                <span className="rounded-full bg-[#FCFBF8] px-4 py-1 text-xs text-[#A5AFBA]">
                  ابدأ محادثة جديدة
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {CHAT_BOT_PROMPT_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onSuggestionSelect(suggestion)}
                    className="rounded-4xl border border-[#EEE8DC] bg-[#FCFBF8] p-4 text-right text-sm leading-6 text-[#24364B] transition hover:bg-[#F7F1E5]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
