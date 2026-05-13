import { useEffect, useState } from "react"
import { chatApi } from "../services/chatApi"
import type { Message } from "../../types/chatT"

export function useMessages(
  conversationId: string | null,
  currentUserId?: number | null,
) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      return
    }

    let isCancelled = false

    const loadMessages = async () => {
      setIsLoading(true)

      try {
        const nextMessages = await chatApi.getMessages(
          conversationId,
          currentUserId,
        )

        if (!isCancelled) {
          setMessages(nextMessages)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadMessages()

    return () => {
      isCancelled = true
    }
  }, [conversationId, currentUserId])

  return { messages, setMessages, isLoading }
}