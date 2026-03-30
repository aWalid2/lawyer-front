import { useEffect, useState } from "react"
import { chatMock } from "../services/chatApi"
import type { Message } from "../types/chatT"

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!conversationId) return
    chatMock.getMessages(conversationId).then(setMessages)
  }, [conversationId])

  return { messages, setMessages }
}