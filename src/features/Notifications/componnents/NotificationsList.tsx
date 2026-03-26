import NotificationItem from "./NotificationItem";

interface Notification {
    id: string;
    senderName: string;
    senderAvatar: string;
    content: string;
    isRead: boolean;
    timestamp: string;
}

interface NotificationsListProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
}

function NotificationsList({ notifications, onMarkAsRead }: NotificationsListProps) {
    if (notifications.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">لا توجد إشعارات</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                />
            ))}
        </div>
    );
}

export default NotificationsList;