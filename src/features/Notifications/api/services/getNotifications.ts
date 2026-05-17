import api from "@/lib/api";

export interface NotificationApiItem {
    id: number;
    sender_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
}

export const getNotifications = async (userId: number | string): Promise<NotificationApiItem[]> => {
    const response = await api.get(`/notify/all/${userId}`);
    return response.data?.data || response.data || [];
};
