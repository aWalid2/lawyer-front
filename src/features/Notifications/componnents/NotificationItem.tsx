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

function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
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
      className={`flex cursor-pointer items-start gap-3 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
        notification.isRead ? "bg-white" : "bg-[#CBA46214]"
      }`}
    >
      <div className="shrink-0">
        <img
          src={notification.senderAvatar || undefined}
          alt={notification.senderName}
          className="h-12 w-12 rounded-full bg-gray-200 object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900">
            {notification.senderName}
          </h3>
          <span className="text-xs text-gray-500">
            {notification.timestamp}
          </span>
        </div>
        <p
          className={`mt-1 text-sm leading-7 text-gray-600 ${
            !isExpanded ? "line-clamp-1" : ""
          }`}
        >
          {notification.content}
        </p>
      </div>

      {!notification.isRead && (
        <div className="shrink-0">
          <div className="h-2 w-2 rounded-full bg-red-400"></div>
        </div>
      )}
    </div>
  );
}

export default NotificationItem;
