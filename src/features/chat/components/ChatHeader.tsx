import { ChevronDown, Phone, Search, Video } from "lucide-react";
import type { Conversation } from "../types/chatT";
import { ChatAvatar } from "./ChatAvatar";

interface ChatHeaderProps {
  conversation?: Conversation;
}

export const ChatHeader = ({ conversation }: ChatHeaderProps) => {
  if (!conversation) {
    return (
      <div className="flex h-20 items-center rounded-[28px] border border-[#EEE8DC] bg-white px-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
        <p className="text-sm text-[#8A97A5]">اختر محادثة لعرض التفاصيل</p>
      </div>
    );
  }

  return (
    <div className="flex h-20 items-center justify-between rounded-[28px] border border-[#EEE8DC] bg-white px-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-[#F7F4EE] p-2 text-[#607080]"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded-full bg-[#F7F4EE] p-2 text-[#607080]"
        >
          <Video className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded-full bg-[#F7F4EE] p-2 text-[#607080]"
        >
          <Phone className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 text-right">
        <button
          type="button"
          className="rounded-full bg-[#F7F4EE] p-2 text-[#607080]"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
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
        <ChatAvatar conversation={conversation} />
      </div>
    </div>
  );
};
