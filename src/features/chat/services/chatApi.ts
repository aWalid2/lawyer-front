// chat.mock.ts

import type { Conversation, Message } from "../types/chatT"

const conversations: Conversation[] = [
  { id: "1", name: "Eten Hunt", lastMessage: "Hello there" },
  { id: "2", name: "John Doe", lastMessage: "How are you?" },
]

const messages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      text: "Hello!",
      senderId: "1",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m2",
      text: "Hi, how can I help?",
      senderId: "me",
      createdAt: new Date().toISOString(),
    },
  ],
}

export const chatMock = {
  getConversations: async () => {
    return new Promise<Conversation[]>((res) =>
      setTimeout(() => res(conversations), 300)
    )
  },

  getMessages: async (conversationId: string) => {
    return new Promise<Message[]>((res) =>
      setTimeout(() => res(messages[conversationId] || []), 300)
    )
  },

  sendMessage: async (conversationId: string, text: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      senderId: "me",
      createdAt: new Date().toISOString(),
    }

    messages[conversationId] = [
      ...(messages[conversationId] || []),
      newMsg,
    ]

    return new Promise<Message>((res) =>
      setTimeout(() => res(newMsg), 200)
    )
  },
}