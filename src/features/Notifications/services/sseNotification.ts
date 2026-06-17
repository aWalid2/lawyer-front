import type { NotificationApiItem } from "../api/services/getNotifications";

const VITE_API_URL = import.meta.env.VITE_API_URL || "/api";

type NewNotificationCallback = (notification: NotificationApiItem) => void;
type StatusCallback = (connected: boolean) => void;

interface SSEManager {
  subscribe: (
    token: string,
    onNewNotification: NewNotificationCallback,
    onStatusChange?: StatusCallback,
  ) => () => void;
}

interface SSENotificationPayload {
  pending?: boolean;
  id: number;
  sender_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
}

export const sseNotification: SSEManager = {
  subscribe: (token, onNewNotification, onStatusChange) => {
    const url = `${VITE_API_URL}/notify/stream?token=${encodeURIComponent(token)}`;
    let eventSource: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let isManuallyDisconnected = false;

    const connect = () => {
      if (isManuallyDisconnected) return;

      eventSource = new EventSource(url);

      eventSource.onopen = () => {
        onStatusChange?.(true);
      };

      eventSource.addEventListener("notification", (event) => {
        try {
          const payload: SSENotificationPayload = JSON.parse(event.data);

          if (payload.pending) {
            return;
          }
          onNewNotification(payload);
        } catch {
          // ignore malformed messages
        }
      });

      eventSource.onerror = () => {
        onStatusChange?.(false);
        eventSource?.close();

        if (!isManuallyDisconnected) {
          reconnectTimer = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      isManuallyDisconnected = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      eventSource?.close();
    };
  },
};
