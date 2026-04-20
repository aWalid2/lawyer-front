import { useQuery } from "@tanstack/react-query";
import { getFirstInstanceSessionTable } from "../services/getFirstInstanceSessionTable";

export const useGetFirstInstanceSessionTable = (caseId: string | number) => {
    return useQuery({
        queryKey: ["first-instance", caseId],
        queryFn: () => getFirstInstanceSessionTable(caseId),
    });
};
