import api from "@/lib/api"
import type { ChatMessageApi, Message } from "../../types/chatT"

type SendMessageInput = {
  receiverId: number
  content: string
  currentUserId?: number | null
}

const mapChatMessage = (
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

export const sendMessage = async (input: SendMessageInput) => {
  const { data } = await api.post<ChatMessageApi>("/chat/send", {
    receiverId: input.receiverId,
    content: input.content,
  })

  return mapChatMessage(data, input.currentUserId)
}
