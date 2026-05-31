import { useQuery } from "@tanstack/react-query";
import { getCaseStatus } from "../services/getCaseStatus";

export const useGetCaseStatus = (enabled = true, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["caseStatus", page, limit],
        queryFn: () => getCaseStatus(page, limit),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        enabled,
        select: (data) => data
    });
};