import type { Conversation } from "../types/chatT";

interface ChatAvatarProps {
  conversation: Conversation;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
};

export const ChatAvatar = ({ conversation, size = "md" }: ChatAvatarProps) => {
  const initials = conversation.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative shrink-0">
      <div
        className={`flex ${sizeClasses[size]} items-center justify-center rounded-full bg-gradient-to-br ${conversation.avatarColor ?? "from-[#D8B26A] to-[#B88542]"} font-semibold text-white shadow-sm`}
      >
        {initials}
      </div>
      <span
        className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${
          conversation.status === "online" ? "bg-success" : "bg-gray-300"
        }`}
      />
    </div>
  );
};
