export type Message = {
  id: string
  text: string
  senderId: string
  createdAt: string
  type?: "text" | "audio"
  duration?: string
}

export type Conversation = {
  id: string
  name: string
  lastMessage: string
  role?: string
  avatarColor?: string
  status?: "online" | "offline"
  lastSeen?: string
  unreadCount?: number
}