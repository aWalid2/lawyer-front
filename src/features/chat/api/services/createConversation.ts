import api from "@/lib/api"
import type { ChatConversationApi, Conversation } from "../../types/chatT"

type CreateConversationInput = {
  receiverId: number
  receiverName?: string
  currentUserId?: number | null
}

const DEFAULT_AVATAR_GRADIENT = "from-[#D8B26A] to-[#B88542]"

const formatFallbackName = (receiverId: number, receiverName?: string) => {
  return receiverName?.trim() || `User ${receiverId}`
}

const mapConversation = (
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

export const createConversation = async (input: CreateConversationInput) => {
  const { data } = await api.post<ChatConversationApi>("/chat/conversation", {
    receiverId: input.receiverId,
  })

  return mapConversation(data, input)
}
