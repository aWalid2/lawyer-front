import { Bot } from "lucide-react";
import { ChatAvatar } from "@/features/chat/components/ChatAvatar";
import type { Conversation } from "@/features/chat/types/chatT";

const botConversation: Conversation = {
  id: "chat-bot-assistant",
  name: "المساعد الذكي",
  lastMessage: "",
  role: "مساعد قانوني للمكتب",
  status: "online",
  avatarColor: "from-[#3F6C51] to-[#1E5B7A]",
};

export const ChatBotHeader = () => {
  return (
    <div className="flex h-20 items-center justify-between rounded-[28px] border border-[#EEE8DC] bg-white px-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3 text-[#607080]">
        <div className="rounded-full bg-[#F7F4EE] p-2">
          <Bot className="h-4 w-4" />
        </div>
        <p className="text-sm text-[#8A97A5]">
          انسخ من الرد مباشرة أو اطلب صياغة جديدة
        </p>
      </div>

      <div className="flex items-center gap-3 text-right">
        <div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-base font-semibold text-[#24364B]">
              {botConversation.name}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#A0ACB8]">{botConversation.role}</p>
        </div>
        <ChatAvatar conversation={botConversation} />
      </div>
    </div>
  );
};
