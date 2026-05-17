import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

export const GlobalNotificationListener = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        // Connect if user exists (or adapt if user is not available)
        // Ensure we connect to the root of the API URL if VITE_API_URL has /api suffix
        const backendUrl = import.meta.env.VITE_API_URL
            ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
            : 'http://localhost:8000'; // Default fallback

        const socket = io(backendUrl, {
            query: { userId: user?.id || 3 }, // Fallback to 3 if user is missing as you mentioned earlier
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Connected to socket server for notifications');
        });

        const handleNewNotification = (data: any) => {
            console.log("New notification received via socket:", data);

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

    return null; // This component doesn't render anything visually
};
