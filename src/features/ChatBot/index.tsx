import PageLayout from "@/shared/components/PageLayout";
import { ChatBotHero } from "./components/ChatBotHero";
import { ChatBotPanel } from "./components/ChatBotPanel";

const ChatBotFeature = () => {
  return (
    <PageLayout className="flex min-h-[calc(100vh-140px)] flex-col gap-6">
      <ChatBotHero />
      <ChatBotPanel />
    </PageLayout>
  );
};

export default ChatBotFeature;
