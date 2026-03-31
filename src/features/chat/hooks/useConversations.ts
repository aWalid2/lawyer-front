import { useEffect, useState } from "react"
import { chatMock } from "../services/chatApi"
import type { Conversation } from "../types/chatT"

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    chatMock.getConversations().then(setConversations)
  }, [])

  return {
    conversations,
    activeId,
    setActive: setActiveId,
  }
}