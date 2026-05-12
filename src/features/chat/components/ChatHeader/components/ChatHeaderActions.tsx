import { Phone, Search, Video } from "lucide-react";
import { ChatHeaderIconButton } from "./ChatHeaderIconButton";

export const ChatHeaderActions = () => {
  return (
    <div className="flex items-center gap-3">
      <ChatHeaderIconButton icon={Search} />
      <ChatHeaderIconButton icon={Video} />
      <ChatHeaderIconButton icon={Phone} />
    </div>
  );
};
