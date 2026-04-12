import { useQuery } from "@tanstack/react-query";
import { getCaseInfo } from "../services/getCaseInfo";

export const useGetCaseInfo = (caseId: string) => {
    return useQuery({
        queryKey: ["caseInfo", caseId],
        queryFn: () => getCaseInfo(caseId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        select: (data) => data
    });
};