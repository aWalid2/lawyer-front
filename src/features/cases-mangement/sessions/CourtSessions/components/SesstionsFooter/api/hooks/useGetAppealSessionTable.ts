import { useQuery } from "@tanstack/react-query";
import { getAppealSessionTable } from "../services/getAppealSessionTable";


export const useGetAppealSessionTable = (caseId: string | number) => {
    return useQuery({
        queryKey: ["appeal-session", caseId],
        queryFn: () => getAppealSessionTable(caseId),
    });
};