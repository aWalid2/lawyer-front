import { useQuery } from "@tanstack/react-query";
import { getCaseStatus } from "../../api/services/getCaseStatus";

export const useGetCaseStatus = () => {
    return useQuery({
        queryKey: ["caseStatus"],
        queryFn: () => getCaseStatus(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        select: (data) => data
    });
};