import { CHAT_BOT_PROMPT_SUGGESTIONS } from "../../../services/chatBotResponse";

interface ChatBotMessagesEmptyStateProps {
  onSuggestionSelect: (prompt: string) => void;
}

export const ChatBotMessagesEmptyState = ({
  onSuggestionSelect,
}: ChatBotMessagesEmptyStateProps) => {
  return (
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
  );
};
