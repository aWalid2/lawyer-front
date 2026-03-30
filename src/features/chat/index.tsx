import { useEffect, useState } from "react"
import { chatMock } from "./services/chatApi"
import type { Conversation, Message } from "./types/chatT"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



const ChatFeature = () => {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [activeId, setActiveId] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")

    /* Load conversations */
    useEffect(() => {
        chatMock.getConversations().then((data) => {
            setConversations(data)
            if (data.length > 0) setActiveId(data[0].id)
        })
    }, [])

    /* Load messages */
    useEffect(() => {
        if (!activeId) return
        chatMock.getMessages(activeId).then(setMessages)
    }, [activeId])

    /* Send message */
    const handleSend = async () => {
        if (!input.trim() || !activeId) return

        const optimisticMessage: Message = {
            id: "temp-" + Date.now(),
            text: input,
            senderId: "me",
            createdAt: new Date().toISOString(),
        }

        // Optimistic UI
        setMessages((prev) => [...prev, optimisticMessage])
        setInput("")

        const savedMessage = await chatMock.sendMessage(
            activeId,
            optimisticMessage.text
        )

        // Replace temp message
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === optimisticMessage.id ? savedMessage : msg
            )
        )
    }

    return (
        <div className="flex h-screen">

            {/* LEFT: Chat */}
            <div className="flex flex-col flex-1">

                {/* Header */}
                <div className="p-4 border-b font-semibold">
                    {conversations.find((c) => c.id === activeId)?.name ||
                        "Select chat"}
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                        {messages.map((msg) => {
                            const isMe = msg.senderId === "me"

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isMe ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-2xl max-w-xs ${isMe
                                            ? "bg-primary text-white"
                                            : "bg-muted"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <Button onClick={handleSend}>Send</Button>
                </div>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="w-80 border-l p-3 space-y-2">
                {conversations.map((c) => (
                    <div
                        key={c.id}
                        onClick={() => setActiveId(c.id)}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeId === c.id ? "bg-muted" : "hover:bg-muted"
                            }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-300" />
                        <div className="flex-1">
                            <p className="font-medium">{c.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {c.lastMessage}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ChatFeature