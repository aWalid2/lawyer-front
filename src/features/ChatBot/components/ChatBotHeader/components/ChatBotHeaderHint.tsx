import { Bot } from "lucide-react";

export const ChatBotHeaderHint = () => {
  return (
    <div className="flex items-center gap-3 text-[#607080]">
      <div className="rounded-full bg-[#F7F4EE] p-2">
        <Bot className="h-4 w-4" />
      </div>
      <p className="text-sm text-[#8A97A5]">
        انسخ من الرد مباشرة أو اطلب صياغة جديدة
      </p>
    </div>
  );
};
