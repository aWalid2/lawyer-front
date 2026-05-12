import { ChatComposer } from "@/features/chat/components/ChatComposer";
import { useChatBot } from "../hooks/useChatBot";
import { ChatBotHeader } from "./ChatBotHeader";
import { ChatBotMessagesPanel } from "./ChatBotMessagesPanel";

export const ChatBotPanel = () => {
  const {
    messages,
    input,
    isGenerating,
    handleAppend,
    handleInputChange,
    handleSend,
    handleStop,
  } = useChatBot();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <ChatBotHeader />
      <ChatBotMessagesPanel
        messages={messages}
        isGenerating={isGenerating}
        onSuggestionSelect={(prompt) =>
          handleAppend({ role: "user", content: prompt })
        }
      />
      <ChatComposer
        input={input}
        onInputChange={handleInputChange}
        onSend={handleSend}
      />
    </div>
  );
};
