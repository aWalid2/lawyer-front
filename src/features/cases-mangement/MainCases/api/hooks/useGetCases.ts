import { useQuery } from "@tanstack/react-query";
import { getCases } from "../services/getCases";

export const useGetCases = (page: number) => {
    return useQuery({
        queryKey: ["cases", page],
        queryFn: () => getCases(page),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        select: (data) => data
    });
};