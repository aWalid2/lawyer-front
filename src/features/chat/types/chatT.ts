export type Message = {
  id: string
  text: string
  senderId: string
  createdAt: string
}

export type Conversation = {
  id: string
  name: string
  lastMessage: string
}