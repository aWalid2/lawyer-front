import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/shared/context/AuthContext";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import type { UserT } from "@/features/settings/users/types/userT";
import type { Conversation, Message } from "./types/chatT";
import { useConversations } from "./api/hooks/useConversations";
import { useMessages } from "./api/hooks/useMessages";
import { chatApi } from "./api/services/chatApi";
import { ChatComposer } from "./components/ChatComposer";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessagesPanel } from "./components/ChatMessagesPanel";
import { ChatSidebar } from "./components/ChatSidebar";

const DRAFT_CONVERSATION_PREFIX = "draft-";

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return fallbackMessage;
};

const mapUserToConversationDraft = (chatUser: UserT): Conversation => ({
  id: `${DRAFT_CONVERSATION_PREFIX}${chatUser.id}`,
  receiverId: chatUser.id,
  name:
    chatUser.fullName ||
    [chatUser.first_name, chatUser.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    chatUser.first_name,
  lastMessage: "",
  role: chatUser.role?.role_name || chatUser.userType || "مستخدم",
  status: chatUser.user_status === "active" ? "online" : "offline",
  avatarColor: "from-[#D8B26A] to-[#B88542]",
});

const ChatFeature = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { data: allUsers = [] } = useGetAllUsers();
  const {
    conversations,
    activeId,
    setActive,
    upsertConversation,
    updateConversationPreview,
  } = useConversations();
  const currentUserId = useMemo(() => {
    const parsedUserId = Number(user?.id);

    return Number.isFinite(parsedUserId) ? parsedUserId : null;
  }, [user?.id]);
  const [input, setInput] = useState("");
  const [isBootstrappingConversation, setIsBootstrappingConversation] =
    useState(false);
  const [isSending, setIsSending] = useState(false);

  const receiverIdParam = searchParams.get("receiverId");
  const receiverNameParam = searchParams.get("receiverName") ?? undefined;
  const conversationIdParam = searchParams.get("conversationId");

  const sidebarConversations = useMemo(() => {
    const existingReceiverIds = new Set(
      conversations
        .map((conversation) => conversation.receiverId)
        .filter((receiverId): receiverId is number => receiverId != null),
    );

    const draftConversations = allUsers
      .filter((chatUser) => chatUser.id !== currentUserId)
      .filter((chatUser) => !existingReceiverIds.has(chatUser.id))
      .map(mapUserToConversationDraft);

    return [...conversations, ...draftConversations];
  }, [allUsers, conversations, currentUserId]);

  const activeConversation = sidebarConversations.find(
    (conversation) => conversation.id === activeId,
  );
  const activeConversationId =
    activeConversation &&
    !activeConversation.id.startsWith(DRAFT_CONVERSATION_PREFIX)
      ? activeConversation.id
      : null;
  const { messages, setMessages } = useMessages(
    activeConversationId,
    currentUserId,
  );

  const handleSelectConversation = async (conversation: Conversation) => {
    setActive(conversation.id);

    if (
      !conversation.id.startsWith(DRAFT_CONVERSATION_PREFIX) ||
      !conversation.receiverId
    ) {
      return;
    }

    setIsBootstrappingConversation(true);

    try {
      const createdConversation = await chatApi.createConversation({
        receiverId: conversation.receiverId,
        receiverName: conversation.name,
        currentUserId,
      });

      upsertConversation({
        ...createdConversation,
        name: conversation.name,
        role: conversation.role,
        status: conversation.status,
        avatarColor: conversation.avatarColor,
      });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "حدث خطأ أثناء إنشاء المحادثة"));
    } finally {
      setIsBootstrappingConversation(false);
    }
  };

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    if (conversationIdParam) {
      const receiverId = Number(receiverIdParam);

      upsertConversation({
        id: conversationIdParam,
        receiverId: Number.isFinite(receiverId) ? receiverId : undefined,
        name: receiverNameParam?.trim() || "محادثة",
        lastMessage: "",
        role: "محادثة",
        avatarColor: "from-[#D8B26A] to-[#B88542]",
        status: "offline",
      });
      return;
    }

    if (!receiverIdParam) {
      return;
    }

    const receiverId = Number(receiverIdParam);

    if (!Number.isFinite(receiverId)) {
      toast.error("receiverId غير صالح");
      return;
    }

    let isCancelled = false;

    const createConversation = async () => {
      setIsBootstrappingConversation(true);

      try {
        const conversation = await chatApi.createConversation({
          receiverId,
          receiverName: receiverNameParam,
          currentUserId,
        });

        if (!isCancelled) {
          upsertConversation(conversation);
        }
      } catch (error: unknown) {
        if (!isCancelled) {
          toast.error(getErrorMessage(error, "حدث خطأ أثناء إنشاء المحادثة"));
        }
      } finally {
        if (!isCancelled) {
          setIsBootstrappingConversation(false);
        }
      }
    };

    void createConversation();

    return () => {
      isCancelled = true;
    };
  }, [
    conversationIdParam,
    currentUserId,
    receiverIdParam,
    receiverNameParam,
    upsertConversation,
  ]);

  const handleSend = async () => {
    if (!input.trim() || !activeId || !activeConversation?.receiverId) return;

    const previousLastMessage = activeConversation.lastMessage;

    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      text: input.trim(),
      senderId: "me",
      conversationId: activeId,
      createdAt: new Date().toISOString(),
      type: "text",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    updateConversationPreview(activeId, optimisticMessage.text);
    setInput("");
    setIsSending(true);

    try {
      const savedMessage = await chatApi.sendMessage({
        receiverId: activeConversation.receiverId,
        content: optimisticMessage.text,
        currentUserId,
      });

      setMessages((prev) =>
        prev.map((message) =>
          message.id === optimisticMessage.id ? savedMessage : message,
        ),
      );
      updateConversationPreview(activeId, savedMessage.text);
    } catch (error: unknown) {
      setMessages((prev) =>
        prev.filter((message) => message.id !== optimisticMessage.id),
      );
      updateConversationPreview(activeId, previousLastMessage);
      setInput(optimisticMessage.text);
      toast.error(getErrorMessage(error, "حدث خطأ أثناء إرسال الرسالة"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-4 lg:flex-row">
        <ChatSidebar
          conversations={sidebarConversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
        />
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <ChatHeader conversation={activeConversation} />
          <ChatMessagesPanel messages={messages} />
          <ChatComposer
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            disabled={
              isSending ||
              isBootstrappingConversation ||
              !activeConversation?.receiverId
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFeature;
