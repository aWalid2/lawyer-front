import { ChatBotHeaderHint } from "./components/ChatBotHeaderHint";
import { ChatBotHeaderIdentity } from "./components/ChatBotHeaderIdentity";

export const ChatBotHeader = () => {
  return (
    <div className="rounded-main flex h-20 items-center justify-between border border-[#EEE8DC] bg-white px-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <ChatBotHeaderIdentity />
      <ChatBotHeaderHint />
    </div>
  );
};
