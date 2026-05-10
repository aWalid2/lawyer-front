import { CheckCheck } from "lucide-react";
import { ChatAvatar } from "./ChatAvatar";
import type { Conversation } from "../types/chatT";

interface ChatSidebarItemProps {
  conversation: Conversation;
  active: boolean;
  onSelect: (id: string) => void;
}

export const ChatSidebarItem = ({
  conversation,
  active,
  onSelect,
}: ChatSidebarItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-right transition-all ${
        active
          ? "border-[#E7D6B2] bg-[#FBF8F2] shadow-sm"
          : "border-transparent bg-white hover:border-[#EEE8DC] hover:bg-[#FCFBF8]"
      }`}
    >
      <ChatAvatar conversation={conversation} size="sm" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-[#24364B]">
            {conversation.name}
          </p>
          <span className="shrink-0 text-[11px] text-[#9AA6B2]">
            {conversation.lastSeen}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <CheckCheck className="h-3.5 w-3.5 shrink-0 text-[#7D95FF]" />
          <p className="truncate text-xs text-[#9AA6B2]">{conversation.role}</p>
        </div>

        <p className="mt-1 truncate text-xs text-[#5C6C7B]">
          {conversation.lastMessage}
        </p>
      </div>

      {conversation.unreadCount ? (
        <span className="rounded-full bg-[#D8B26A] px-2 py-0.5 text-[10px] font-semibold text-white">
          {conversation.unreadCount}
        </span>
      ) : null}
    </button>
  );
};
