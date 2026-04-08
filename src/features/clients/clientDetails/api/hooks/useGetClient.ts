import { useQuery } from "@tanstack/react-query";
import { getClient } from "../services/getClient";

export const useGetClient = (id: string) => {
    return useQuery({
        queryKey: ["client", id],
        queryFn: () => getClient(id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        select: (data) => data
    });
};