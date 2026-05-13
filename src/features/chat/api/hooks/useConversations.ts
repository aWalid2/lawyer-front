import { useCallback, useState } from "react"
import type { Conversation } from "../../types/chatT"

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const upsertConversation = useCallback((conversation: Conversation) => {
    setConversations((currentConversations) => {
      const existingConversation = currentConversations.find(
        (item) => item.id === conversation.id,
      )

      if (!existingConversation) {
        return [conversation, ...currentConversations]
      }

      return currentConversations.map((item) =>
        item.id === conversation.id ? { ...item, ...conversation } : item,
      )
    })

    setActiveId(conversation.id)
  }, [])

  const updateConversationPreview = useCallback(
    (conversationId: string, lastMessage: string) => {
      setConversations((currentConversations) =>
        currentConversations.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                lastMessage,
              }
            : conversation,
        ),
      )
    },
    [],
  )

  return {
    conversations,
    activeId,
    setActive: setActiveId,
    upsertConversation,
    updateConversationPreview,
  }
}