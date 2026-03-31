import { chatMock } from "../services/chatApi"
import type { Message } from "../types/chatT"

export function useSendMessage(
  conversationId: string | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
  const sendMessage = async (text: string) => {
    if (!conversationId) return

    const newMsg = await chatMock.sendMessage(
      conversationId,
      text
    )

    setMessages((prev) => [...prev, newMsg])
  }

  return { sendMessage }
}