import { useQuery } from "@tanstack/react-query";
import { getCaseType } from "../services/getCaseType";

export const useGetCaseType = (enabled = true) => {
    return useQuery({
        queryKey: ["caseType"],
        queryFn: () => getCaseType(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        enabled,
        select: (data) => data
    });
};