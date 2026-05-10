import { Play } from "lucide-react";
import type { Message } from "../types/chatT";

interface ChatBubbleProps {
  message: Message;
}

const formatMessageTime = (createdAt: string) => {
  return new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isMe = message.senderId === "me";

  if (message.type === "audio") {
    return (
      <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
        <div className="max-w-[280px]">
          <div className="flex items-center gap-3 rounded-[18px] bg-[#3B496D] px-4 py-3 text-white shadow-sm">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"
            >
              <Play className="h-4 w-4 fill-current" />
            </button>
            <div className="flex flex-1 items-center gap-1">
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  key={index}
                  className="w-1 rounded-full bg-white/80"
                  style={{ height: `${8 + ((index * 5) % 16)}px` }}
                />
              ))}
            </div>
            <span className="text-xs text-white/80">{message.duration}</span>
          </div>
          <p className="mt-1 text-left text-[11px] text-[#B1BAC5]">
            Today {formatMessageTime(message.createdAt)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[300px]">
        <div
          className={`rounded-[16px] px-4 py-3 text-sm leading-6 shadow-sm ${
            isMe ? "bg-[#3B496D] text-white" : "bg-[#E7D0A2] text-[#3F3421]"
          }`}
        >
          {message.text}
        </div>
        <p
          className={`mt-1 text-[11px] text-[#B1BAC5] ${
            isMe ? "text-left" : "text-right"
          }`}
        >
          Today {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
};
