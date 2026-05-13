import api from "@/lib/api"
import type { ChatMessageApi, Message } from "../../types/chatT"

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

export const getMessages = async (
  conversationId: string,
  currentUserId?: number | null,
) => {
  const { data } = await api.get<ChatMessageApi[]>(
    `/chat/messages/${conversationId}`,
  )

  return data.map((message) => mapChatMessage(message, currentUserId))
}
