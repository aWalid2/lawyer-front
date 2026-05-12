import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@/components/ui/chat-message";
import { ChatBotMessagesEmptyState } from "./components/ChatBotMessagesEmptyState";
import { ChatBotMessagesList } from "./components/ChatBotMessagesList";

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
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isGenerating]);

  return (
    <div className="rounded-main flex min-h-0 flex-1 border border-[#EEE8DC] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <ScrollArea
        ref={scrollAreaRef}
        className="h-[calc(100vh-360px)] w-full px-6 py-6"
      >
        <div className="mx-auto space-y-5">
          {messages.length === 0 ? (
            <ChatBotMessagesEmptyState
              onSuggestionSelect={onSuggestionSelect}
            />
          ) : (
            <ChatBotMessagesList
              messages={messages}
              isGenerating={isGenerating}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
