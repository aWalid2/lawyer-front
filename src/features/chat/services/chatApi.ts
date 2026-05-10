// chat.mock.ts

import type { Conversation, Message } from "../types/chatT"

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Eten Hunt",
    lastMessage: "Good question. How about just discussing it?",
    role: "الشريك",
    avatarColor: "from-[#F2C66D] to-[#E59A52]",
    status: "online",
    lastSeen: "5m Ago",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Lina Morgan",
    lastMessage: "Yes of course. Are there problems with your job?",
    role: "السكرتارية",
    avatarColor: "from-[#F9B38C] to-[#E67051]",
    status: "offline",
    lastSeen: "7m Ago",
  },
  {
    id: "3",
    name: "Mark Stone",
    lastMessage: "Morning Eten Hunt. I have a question about my job!",
    role: "المحاسبة",
    avatarColor: "from-[#8AB6FF] to-[#4A6FD6]",
    status: "offline",
    lastSeen: "7m Ago",
  },
  {
    id: "4",
    name: "Nora James",
    lastMessage: "What are the points that are important to get the perfect result of my assignment?",
    role: "العملاء",
    avatarColor: "from-[#FF9F94] to-[#C75A7A]",
    status: "offline",
    lastSeen: "7m Ago",
  },
]

const messages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      text: "What are the points that are important to get the perfect result of my assignment?",
      senderId: "1",
      createdAt: new Date(new Date().setHours(11, 54, 0, 0)).toISOString(),
      type: "text",
    },
    {
      id: "m2",
      text: "Morning Eten Hunt. I have a question about my job!",
      senderId: "me",
      createdAt: new Date(new Date().setHours(11, 52, 0, 0)).toISOString(),
      type: "text",
    },
    {
      id: "m3",
      text: "Yes of course. Are there problems with your job?",
      senderId: "1",
      createdAt: new Date(new Date().setHours(11, 53, 0, 0)).toISOString(),
      type: "text",
    },
    {
      id: "m4",
      text: "Good question. How about just discussing it?",
      senderId: "1",
      createdAt: new Date(new Date().setHours(11, 55, 0, 0)).toISOString(),
      type: "text",
    },
    {
      id: "m5",
      text: "Of course. Thank you so much for taking your time.",
      senderId: "me",
      createdAt: new Date(new Date().setHours(11, 56, 0, 0)).toISOString(),
      type: "text",
    },
    {
      id: "m6",
      text: "Voice message",
      senderId: "me",
      createdAt: new Date(new Date().setHours(12, 2, 0, 0)).toISOString(),
      type: "audio",
      duration: "10:12",
    },
  ],
  "2": [
    {
      id: "m7",
      text: "Can we review the client file before lunch?",
      senderId: "2",
      createdAt: new Date().toISOString(),
      type: "text",
    },
  ],
  "3": [
    {
      id: "m8",
      text: "I uploaded the salary report for May.",
      senderId: "3",
      createdAt: new Date().toISOString(),
      type: "text",
    },
  ],
  "4": [
    {
      id: "m9",
      text: "Please confirm the session date for tomorrow.",
      senderId: "4",
      createdAt: new Date().toISOString(),
      type: "text",
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
      type: "text",
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