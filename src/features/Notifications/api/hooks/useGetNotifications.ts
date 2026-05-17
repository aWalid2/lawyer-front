import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/getNotifications";

export const useGetNotifications = (userId: number | string) => {
    return useQuery({
        queryKey: ["notifications", userId],
        queryFn: () => getNotifications(userId),
        enabled: !!userId,
    });
};
