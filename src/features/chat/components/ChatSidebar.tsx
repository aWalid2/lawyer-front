import { Grid2X2, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Conversation } from "../types/chatT";
import { ChatSidebarItem } from "./ChatSidebarItem";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const ChatSidebar = ({
  conversations,
  activeId,
  onSelect,
}: ChatSidebarProps) => {
  return (
    <aside className="flex h-full w-full flex-col rounded-[28px] border border-[#EEE8DC] bg-white p-4 shadow-[0_16px_38px_rgba(15,23,42,0.06)] lg:max-w-[360px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#24364B]">الدردشات</h2>
        <div className="flex items-center gap-2 text-[#607080]">
          <button type="button" className="rounded-full bg-[#F7F4EE] p-2">
            <Grid2X2 className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-full bg-[#F7F4EE] p-2">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#A5AFBA]" />
        <Input
          readOnly
          value=""
          placeholder="بحث..."
          className="h-11 rounded-2xl border-[#EEE8DC] bg-[#FCFBF8] pr-10 text-right"
        />
      </div>

      <div className="space-y-2 overflow-y-auto pr-1">
        {conversations.map((conversation) => (
          <ChatSidebarItem
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  );
};
