import { useQuery } from "@tanstack/react-query";
import { getCassaionSessionTable } from "../services/getCassaionSessionTable";


export const useGetCassaionSessionTable = (caseId: string | number, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["cassaion-session", caseId, page, limit],
        queryFn: () => getCassaionSessionTable(Number(caseId), page, limit),
        enabled: !!caseId,
    });
};