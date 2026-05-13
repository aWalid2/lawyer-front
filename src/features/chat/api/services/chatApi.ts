import api from "@/lib/api"
import type {
  ChatConversationApi,
  ChatMessageApi,
  Conversation,
  Message,
} from "../../types/chatT"

type CreateConversationInput = {
  receiverId: number
  receiverName?: string
  currentUserId?: number | null
}

type SendMessageInput = {
  receiverId: number
  content: string
  currentUserId?: number | null
}

const DEFAULT_AVATAR_GRADIENT = "from-[#D8B26A] to-[#B88542]"

const formatFallbackName = (receiverId: number, receiverName?: string) => {
  return receiverName?.trim() || `User ${receiverId}`
}

export const mapChatMessage = (
  message: ChatMessageApi,
  currentUserId?: number | null,
): Message => ({
  id: String(message.id),
  conversationId: String(message.conversationId),
  text: message.content,
  senderId:
    currentUserId != null && message.senderId === currentUserId
      ? "me"
      : String(message.senderId),
  senderName: message.sender?.first_name,
  createdAt: message.createdAt,
  type: "text",
})

export const mapConversation = (
  conversation: ChatConversationApi,
  options: CreateConversationInput,
): Conversation => {
  const otherMember = conversation.members.find(
    (member) => member.userId !== options.currentUserId,
  )

  return {
    id: String(conversation.id),
    receiverId: otherMember?.userId ?? options.receiverId,
    name: formatFallbackName(
      otherMember?.userId ?? options.receiverId,
      options.receiverName,
    ),
    lastMessage: "",
    createdAt: conversation.createdAt,
    avatarColor: DEFAULT_AVATAR_GRADIENT,
    status: "offline",
    role: "محادثة",
  }
}

export const chatApi = {
  async createConversation(input: CreateConversationInput) {
    const { data } = await api.post<ChatConversationApi>("/chat/conversation", {
      receiverId: input.receiverId,
    })

    return mapConversation(data, input)
  },

  async getMessages(conversationId: string, currentUserId?: number | null) {
    const { data } = await api.get<ChatMessageApi[]>(
      `/chat/messages/${conversationId}`,
    )

    return data.map((message) => mapChatMessage(message, currentUserId))
  },

  async sendMessage(input: SendMessageInput) {
    const { data } = await api.post<ChatMessageApi>("/chat/send", {
      receiverId: input.receiverId,
      content: input.content,
    })

    return mapChatMessage(data, input.currentUserId)
  },
}