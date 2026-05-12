import { ChatAvatar } from "@/features/chat/components/ChatAvatar";
import { botConversation } from "../constants";

export const ChatBotHeaderIdentity = () => {
  return (
    <div className="flex items-center gap-3 text-right">
      <ChatAvatar conversation={botConversation} />
      <div>
        <div className="flex items-center justify-end gap-2">
          <span className="text-base font-semibold text-[#24364B]">
            {botConversation.name}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#A0ACB8]">{botConversation.role}</p>
      </div>
    </div>
  );
};
