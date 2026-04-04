import { useQuery } from "@tanstack/react-query";
import { getCases } from "../services/getCases";

export const useGetCases = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["cases", page, limit],
        queryFn: () => getCases(page, limit),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        select: (data) => data
    });
};