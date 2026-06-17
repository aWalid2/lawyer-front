import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { sseNotification } from "../services/sseNotification";
import { useQueryClient } from "@tanstack/react-query";

interface UseNotificationSSEOptions {
  token: string | undefined;
  userId: string | number | undefined;
  enabled?: boolean;
}

export const useNotificationSSE = ({
  token,
  userId,
  enabled = true,
}: UseNotificationSSEOptions) => {
  const queryClient = useQueryClient();
  const cleanupRef = useRef<(() => void) | null>(null);

  const showToast = useCallback(
    (content: string) => {
      toast(content, {
        description: "لديك إشعار جديد",
        duration: 5000,
        action: {
          label: "عرض",
          onClick: () => {
            window.location.href = "/dashboard/notifications";
          },
        },
      });
    },
    [],
  );

  useEffect(() => {
    if (!token || !enabled) return;

    cleanupRef.current?.();

    cleanupRef.current = sseNotification.subscribe(
      token,
      (notification) => {
        showToast(notification.content);
        if (userId) {
          queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
        }
      },
      () => {
        // Connection status changed – optional UI feedback
      },
    );

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [userId, enabled, showToast, queryClient]);
};
