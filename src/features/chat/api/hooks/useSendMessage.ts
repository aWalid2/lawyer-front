import { sendMessage as sendMessageService } from "../services/sendMessage"
import type { Message } from "../../types/chatT"

export function useSendMessage(
  receiverId: number | null,
  currentUserId: number | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
  const sendMessage = async (text: string) => {
    if (!receiverId) return

    const newMsg = await sendMessageService({
      receiverId,
      content: text,
      currentUserId,
    })

    setMessages((prev) => [...prev, newMsg])
  }

  return { sendMessage }
}