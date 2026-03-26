import { useState } from "react";

interface NotificationItemProps {
    notification: {
        id: string;
        senderName: string;
        senderAvatar: string;
        content: string;
        isRead: boolean;
        timestamp: string;
    };
    onMarkAsRead: (id: string) => void;
}

function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer ${
                notification.isRead ? "bg-white" : "bg-[#CBA46214]"
            }`}
        >
            {/* الصورة */}
            <div className="shrink-0">
                <img
                    src={notification.senderAvatar}
                    alt={notification.senderName}
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>

            {/* المحتوى */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-semibold text-gray-900 text-base">
                        {notification.senderName}
                    </h3>
                    <span className="text-xs text-gray-500">
                        {notification.timestamp}
                    </span>
                </div>
                <p
                    className={`text-gray-600 text-sm mt-1 ${
                        !isExpanded ? "line-clamp-1" : ""
                    }`}
                >
                    {notification.content}
                </p>
            </div>

            {/* نقطة الإشعار غير المقروء */}
            {!notification.isRead && (
                <div className="shrink-0">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
            )}
        </div>
    );
}

export default NotificationItem;