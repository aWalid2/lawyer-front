import api from "@/lib/api";
import type { NotificationApiItem } from "./getNotifications";

export const markNotificationRead = async (id: number | string): Promise<NotificationApiItem> => {
    const response = await api.put(`/notify/${id}/mark-read`);
    return response.data?.data || response.data;
};
