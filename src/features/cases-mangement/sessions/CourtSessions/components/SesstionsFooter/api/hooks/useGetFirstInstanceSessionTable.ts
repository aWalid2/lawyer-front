import { useQuery } from "@tanstack/react-query";
import { getFirstInstanceSessionTable } from "../services/getFirstInstanceSessionTable";

export const useGetFirstInstanceSessionTable = (
    caseId: string | number,
    page?: number,
    limit?: number,
    enabled: boolean = true,
) => {
    return useQuery({
        queryKey: ["first-instance", caseId, page, limit],
        queryFn: () => getFirstInstanceSessionTable(Number(caseId), page, limit),
        enabled: !!caseId && enabled,
    });
};
