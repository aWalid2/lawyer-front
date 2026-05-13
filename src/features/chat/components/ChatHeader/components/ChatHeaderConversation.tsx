import type { Conversation } from "../../../types/chatT";
import { ChatAvatar } from "../../ChatAvatar";

interface ChatHeaderConversationProps {
  conversation: Conversation;
}

export const ChatHeaderConversation = ({
  conversation,
}: ChatHeaderConversationProps) => {
  return (
    <div className="flex items-center gap-3 text-right">
      <ChatAvatar conversation={conversation} />
      <div>
        <div className="flex items-center justify-end gap-2">
          <span className="text-base font-semibold text-[#24364B]">
            {conversation.name}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#A0ACB8]">
          {conversation.status === "online" ? "متصل الآن" : conversation.role}
        </p>
      </div>
    </div>
  );
};
