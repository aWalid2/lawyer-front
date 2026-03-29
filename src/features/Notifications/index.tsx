import { useEffect, useState, useMemo } from "react";
import PageLayout from "@/shared/components/PageLayout";
import NotificationFilters from "./componnents/NotificationFilters";
import NotificationsList from "./componnents/NotificationsList";
import { Pagination } from "@/shared/components/Pagination";

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

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            senderName: "أحمد محمد",
            senderAvatar: "https://tse2.mm.bing.net/th/id/OIP.4mEmvA0J25PMkIWp3gMy_AHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالتعليق على منشورك ام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشوركام بالتعليق على منشورك",
            isRead: false,
            timestamp: "منذ 5 دقائق",
        },
        {
            id: "2",
            senderName: "سارة علي",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.X808-dA6q1pDb2975vKYRAHaIt?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "أرسلت لك طلب صداقة",
            isRead: false,
            timestamp: "منذ ساعة",
        },
        {
            id: "3",
            senderName: "محمد إبراهيم",
            senderAvatar: "https://tse3.mm.bing.net/th/id/OIP.f98qZq5xOtfkxbUdhnGQtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالإعجاب بصورتك",
            isRead: true,
            timestamp: "منذ يومين",
        },
        {
            id: "4",
            senderName: "فاطمة حسن",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.SXGI39_V0C1VobA2jHjl1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "ذكرك في تعليق",
            isRead: true,
            timestamp: "منذ 3 أيام",
        },
        {
            id: "5",
            senderName: "أحمد محمد",
            senderAvatar: "https://tse2.mm.bing.net/th/id/OIP.4mEmvA0J25PMkIWp3gMy_AHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالتعليق على منشورك",
            isRead: false,
            timestamp: "منذ 5 دقائق",
        },
        {
            id: "6",
            senderName: "سارة علي",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.X808-dA6q1pDb2975vKYRAHaIt?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "أرسلت لك طلب صداقة",
            isRead: false,
            timestamp: "منذ ساعة",
        },
        {
            id: "7",
            senderName: "محمد إبراهيم",
            senderAvatar: "https://tse3.mm.bing.net/th/id/OIP.f98qZq5xOtfkxbUdhnGQtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالإعجاب بصورتك",
            isRead: true,
            timestamp: "منذ يومين",
        },
        {
            id: "8",
            senderName: "فاطمة حسن",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.SXGI39_V0C1VobA2jHjl1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "ذكرك في تعليق",
            isRead: true,
            timestamp: "منذ 3 أيام",
        },
        {
            id: "9",
            senderName: "أحمد محمد",
            senderAvatar: "https://tse2.mm.bing.net/th/id/OIP.4mEmvA0J25PMkIWp3gMy_AHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالتعليق على منشورك",
            isRead: false,
            timestamp: "منذ 5 دقائق",
        },
        {
            id: "10",
            senderName: "سارة علي",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.X808-dA6q1pDb2975vKYRAHaIt?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "أرسلت لك طلب صداقة",
            isRead: false,
            timestamp: "منذ ساعة",
        },
        {
            id: "11",
            senderName: "محمد إبراهيم",
            senderAvatar: "https://tse3.mm.bing.net/th/id/OIP.f98qZq5xOtfkxbUdhnGQtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالإعجاب بصورتك",
            isRead: true,
            timestamp: "منذ يومين",
        },
        {
            id: "12",
            senderName: "فاطمة حسن",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.SXGI39_V0C1VobA2jHjl1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "ذكرك في تعليق",
            isRead: true,
            timestamp: "منذ 3 أيام",
        },
        {
            id: "13",
            senderName: "أحمد محمد",
            senderAvatar: "https://tse2.mm.bing.net/th/id/OIP.4mEmvA0J25PMkIWp3gMy_AHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالتعليق على منشورك",
            isRead: false,
            timestamp: "منذ 5 دقائق",
        },
        {
            id: "14",
            senderName: "سارة علي",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.X808-dA6q1pDb2975vKYRAHaIt?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "أرسلت لك طلب صداقة",
            isRead: false,
            timestamp: "منذ ساعة",
        },
        {
            id: "15",
            senderName: "محمد إبراهيم",
            senderAvatar: "https://tse3.mm.bing.net/th/id/OIP.f98qZq5xOtfkxbUdhnGQtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالإعجاب بصورتك",
            isRead: true,
            timestamp: "منذ يومين",
        },
        {
            id: "16",
            senderName: "فاطمة حسن",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.SXGI39_V0C1VobA2jHjl1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "ذكرك في تعليق",
            isRead: true,
            timestamp: "منذ 3 أيام",
        },
        {
            id: "17",
            senderName: "أحمد محمد",
            senderAvatar: "https://tse2.mm.bing.net/th/id/OIP.4mEmvA0J25PMkIWp3gMy_AHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالتعليق على منشورك",
            isRead: false,
            timestamp: "منذ 5 دقائق",
        },
        {
            id: "18",
            senderName: "سارة علي",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.X808-dA6q1pDb2975vKYRAHaIt?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "أرسلت لك طلب صداقة",
            isRead: false,
            timestamp: "منذ ساعة",
        },
        {
            id: "19",
            senderName: "محمد إبراهيم",
            senderAvatar: "https://tse3.mm.bing.net/th/id/OIP.f98qZq5xOtfkxbUdhnGQtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالإعجاب بصورتك",
            isRead: true,
            timestamp: "منذ يومين",
        },
        {
            id: "20",
            senderName: "فاطمة حسن",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.SXGI39_V0C1VobA2jHjl1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "ذكرك في تعليق",
            isRead: true,
            timestamp: "منذ 3 أيام",
        },
        {
            id: "21",
            senderName: "أحمد محمد",
            senderAvatar: "https://tse2.mm.bing.net/th/id/OIP.4mEmvA0J25PMkIWp3gMy_AHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالتعليق على منشورك",
            isRead: false,
            timestamp: "منذ 5 دقائق",
        },
        {
            id: "22",
            senderName: "سارة علي",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.X808-dA6q1pDb2975vKYRAHaIt?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "أرسلت لك طلب صداقة",
            isRead: false,
            timestamp: "منذ ساعة",
        },
        {
            id: "23",
            senderName: "محمد إبراهيم",
            senderAvatar: "https://tse3.mm.bing.net/th/id/OIP.f98qZq5xOtfkxbUdhnGQtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "قام بالإعجاب بصورتك",
            isRead: true,
            timestamp: "منذ يومين",
        },
        {
            id: "24",
            senderName: "فاطمة حسن",
            senderAvatar: "https://tse1.mm.bing.net/th/id/OIP.SXGI39_V0C1VobA2jHjl1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            content: "ذكرك في تعليق",
            isRead: true,
            timestamp: "منذ 3 أيام",
        },
    ]);

    const onFilterChange = (key: string, value: any) => {
        setCurrentPage(1);
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
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