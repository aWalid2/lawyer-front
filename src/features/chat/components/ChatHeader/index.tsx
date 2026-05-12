import type { Conversation } from "../../types/chatT";
import { ChatHeaderActions } from "./components/ChatHeaderActions";
import { ChatHeaderConversation } from "./components/ChatHeaderConversation";
import { ChatHeaderEmpty } from "./components/ChatHeaderEmpty";

interface ChatHeaderProps {
  conversation?: Conversation;
}

export const ChatHeader = ({ conversation }: ChatHeaderProps) => {
  if (!conversation) {
    return <ChatHeaderEmpty />;
  }

  return (
    <div className="flex h-20 items-center justify-between rounded-[28px] border border-[#EEE8DC] bg-white px-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <ChatHeaderConversation conversation={conversation} />
      <ChatHeaderActions />
    </div>
  );
};
