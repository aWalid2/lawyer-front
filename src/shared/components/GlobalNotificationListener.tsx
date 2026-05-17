import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

export const GlobalNotificationListener = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {

        const backendUrl = import.meta.env.VITE_API_URL
            ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
            : 'http://localhost:8000';

        const socket = io(backendUrl, {
            query: { userId: user?.id || 3 },
            transports: ['websocket', 'polling'],
            reconnection: false,
        });

        socket.on('connect', () => {
            // console.log('Connected to socket server for notifications');
        });

        const handleNewNotification = (data: any) => {
            // console.log("New notification received via socket:", data);

            // Trigger toast
            toast.info("لديك إشعار جديد", {
                description: data?.content || "تمت إضافة مهمة جديدة إليك",
            });

            // Invalidate notifications cache to update dropdowns/pages instantly
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        };

        // Listen for common notification event names
        // Adjust these to match what your backend emits
        socket.on('new_notification', handleNewNotification);
        socket.on('notification', handleNewNotification);
        socket.on('new_task', handleNewNotification);

        return () => {
            socket.off('new_notification', handleNewNotification);
            socket.off('notification', handleNewNotification);
            socket.off('new_task', handleNewNotification);
            socket.disconnect();
        };
    }, [user?.id, queryClient]);

    return null;
};
