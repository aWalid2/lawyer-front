import { ChatComposer } from "./components/ChatComposer";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessagesPanel } from "./components/ChatMessagesPanel";
import { ChatSidebar } from "./components/ChatSidebar";
import { useChatFeature } from "./hooks/useChatFeature";

const ChatFeature = () => {
  const {
    activeConversation,
    activeId,
    handleSelectConversation,
    handleSend,
    input,
    isBootstrappingConversation,
    messages,
    setInput,
    sidebarConversations,
  } = useChatFeature();

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-4 lg:flex-row">
        <ChatSidebar
          conversations={sidebarConversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
        />
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <ChatHeader conversation={activeConversation} />
          <ChatMessagesPanel messages={messages} />
          <ChatComposer
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            disabled={
              isBootstrappingConversation || !activeConversation?.receiverId
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFeature;
