import { useState } from "react";
import { chatMock } from "./services/chatApi";
import type { Message } from "./types/chatT";
import { useConversations } from "./hooks/useConversations";
import { useMessages } from "./hooks/useMessages";
import { ChatComposer } from "./components/ChatComposer";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessagesPanel } from "./components/ChatMessagesPanel";
import { ChatSidebar } from "./components/ChatSidebar";

const ChatFeature = () => {
  const { conversations, activeId, setActive } = useConversations();
  const { messages, setMessages } = useMessages(activeId);
  const [input, setInput] = useState("");

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
  );

  const handleSend = async () => {
    if (!input.trim() || !activeId) return;

    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      text: input.trim(),
      senderId: "me",
      createdAt: new Date().toISOString(),
      type: "text",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInput("");

    const savedMessage = await chatMock.sendMessage(
      activeId,
      optimisticMessage.text,
    );

    setMessages((prev) =>
      prev.map((message) =>
        message.id === optimisticMessage.id ? savedMessage : message,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-4 lg:flex-row">
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <ChatHeader conversation={activeConversation} />
          <ChatMessagesPanel messages={messages} />
          <ChatComposer
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
          />
        </div>

        <ChatSidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={setActive}
        />
      </div>
    </div>
  );
};

export default ChatFeature;
