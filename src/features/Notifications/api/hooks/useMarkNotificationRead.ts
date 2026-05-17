import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "../services/markNotificationRead";

export const useMarkNotificationRead = (userId: number | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: string | number) => markNotificationRead(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
        },
    });
};
