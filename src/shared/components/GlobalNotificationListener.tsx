import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export const GlobalNotificationListener = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Don't connect if user is not loaded
    if (!user?.sub) {
      console.log("⏳ Waiting for user to load...");
      return;
    }

    const backendUrl = import.meta.env.VITE_API_URL;

    // Get token from localStorage or cookies
    const token = localStorage.getItem("access_token") || "";

    console.log(
      "🔌 Connecting to socket at:",
      backendUrl,
      "with userId:",
      user.sub,
    );

    const socket = io(backendUrl, {
      query: { userId: user.sub },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      secure: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      // cors: {
      //   origin: true,
      //   credentials: true,
      // },
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server for notifications");
      console.log("📡 Using transport:", socket.io.engine.transport.name);
    });

    socket.on("connect_error", (error: any) => {
      console.error("❌ Socket connection error:", error);
      console.error("📡 Error details:", error.message, error.type);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("⚠️ Socket disconnected. Reason:", reason);
    });

    socket.on("error", (error: any) => {
      console.error("❌ Socket error event:", error);
    });

    const handleNewNotification = (data: any) => {
      console.log("🔔 New notification received via socket:", data);

      toast.info("لديك إشعار جديد", {
        description: data?.content || "تمت إضافة مهمة جديدة إليك",
      });

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    // Listen for backend event names
    socket.on("notification", handleNewNotification);
    socket.on("pending_notifications", handleNewNotification);
    socket.on("receive_message", handleNewNotification);

    // Log ALL incoming events to help debug
    socket.onAny((eventName: string, ...args: any[]) => {
      console.log(`📨 Socket event received: "${eventName}"`, args);
    });

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("pending_notifications", handleNewNotification);
      socket.off("receive_message", handleNewNotification);
      socket.disconnect();
    };
  }, [user?.sub, queryClient]);

  return null;
};
