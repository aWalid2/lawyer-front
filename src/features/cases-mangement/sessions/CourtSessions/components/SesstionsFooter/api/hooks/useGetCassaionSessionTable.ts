import { useQuery } from "@tanstack/react-query";
import { getCassaionSessionTable } from "../services/getCassaionSessionTable";


export const useGetCassaionSessionTable = (caseId: string | number) => {
    return useQuery({
        queryKey: ["cassaion-session", caseId],
        queryFn: () => getCassaionSessionTable(caseId),
    });
};