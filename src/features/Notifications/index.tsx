import { useEffect, useState, useMemo } from "react";
import PageLayout from "@/shared/components/PageLayout";
import NotificationFilters from "./componnents/NotificationFilters";
import NotificationsList from "./componnents/NotificationsList";
import { Pagination } from "@/shared/components/Pagination";
import { useGetNotifications } from "./api/hooks/useGetNotifications";
import { useMarkNotificationRead } from "./api/hooks/useMarkNotificationRead";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import type { UserT } from "@/features/settings/users/types/userT";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

interface Notification {
    id: string;
    senderName: string;
    senderAvatar: string;
    content: string;
    isRead: boolean;
    timestamp: string;
}

function Notification() {
    const [filters, setFilters] = useState<{ notificationStatus: string }>({
        notificationStatus: "all",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    const userId = 3;
    const { data: apiNotifications, isPending, isError, error } = useGetNotifications(userId);
    const { mutate: markAsRead } = useMarkNotificationRead(userId);
    const { data: usersResponse } = useGetAllUsers();

    const notificationsMap = useMemo(() => {
        const userMap = new Map();
        if (usersResponse) {
            usersResponse.forEach((user: UserT) => {
                userMap.set(user.id, {
                    name: user.first_name || user.fullName || `مستخدم #${user.id}`,
                    avatar: ""
                });
            });
        }
        return userMap;
    }, [usersResponse]);

    const notifications = useMemo<Notification[]>(() => {
        if (!apiNotifications) return [];
        return apiNotifications.map(item => {
            const sender = notificationsMap.get(item.sender_id) || { name: `مستخدم #${item.sender_id}`, avatar: "" };

            const date = new Date(item.created_at);
            const formattedDate = date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            return {
                id: String(item.id),
                senderName: sender.name,
                senderAvatar: sender.avatar,
                content: item.content,
                isRead: item.is_read,
                timestamp: formattedDate
            };
        });
    }, [apiNotifications, notificationsMap]);

    const onFilterChange = (key: string, value: any) => {
        setCurrentPage(1);
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleMarkAsRead = (id: string) => {
        markAsRead(id);
    };

    useEffect(() => {
        console.log("Filters changed:", filters);
    }, [filters]);

    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification) => {
            if (filters.notificationStatus === "all") return true;
            if (filters.notificationStatus === "new") return !notification.isRead;
            if (filters.notificationStatus === "read") return notification.isRead;
            return true;
        });
    }, [notifications, filters]);

    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

    const paginatedNotifications = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredNotifications.slice(start, start + itemsPerPage);
    }, [filteredNotifications, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters.notificationStatus]);

    if (isPending) return <LoadingPage />;
    if (isError) return <Error message="حدث خطأ في تحميل الإشعارات" error={error} />;

    return (
        <PageLayout>
            <NotificationFilters
                notificationStatus={filters.notificationStatus}
                onFilterChange={(v) => onFilterChange("notificationStatus", v)}
            />
            <NotificationsList
                notifications={paginatedNotifications}
                onMarkAsRead={handleMarkAsRead}
            />
            {totalPages > 1 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </PageLayout>
    );
}

export default Notification;