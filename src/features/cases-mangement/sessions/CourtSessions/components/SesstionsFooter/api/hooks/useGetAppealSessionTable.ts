import { useQuery } from "@tanstack/react-query";
import { getAppealSessionTable } from "../services/getAppealSessionTable";


export const useGetAppealSessionTable = (
    caseId: string | number,
    page?: number,
    limit?: number,
    enabled: boolean = true,
) => {
    return useQuery({
        queryKey: ["appeal-session", caseId, page, limit],
        queryFn: () => getAppealSessionTable(caseId, page, limit),
        enabled: !!caseId && enabled,
    });
};