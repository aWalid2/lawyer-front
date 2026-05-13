export type Message = {
  id: string
  text: string
  senderId: string
  createdAt: string
  conversationId?: string
  senderName?: string
  type?: "text" | "audio"
  duration?: string
}

export type Conversation = {
  id: string
  name: string
  receiverId?: number
  lastMessage: string
  createdAt?: string
  role?: string
  avatarColor?: string
  status?: "online" | "offline"
  lastSeen?: string
  unreadCount?: number
}

export type ChatMessageApi = {
  id: number
  conversationId: number
  senderId: number
  content: string
  createdAt: string
  sender?: {
    id: number
    first_name: string
  }
}

export type ChatConversationApi = {
  id: number
  createdAt: string
  members: Array<{
    id: number
    conversationId: number
    userId: number
  }>
}