import { useQuery } from "@tanstack/react-query";
import { getProsecutionSessionInfo } from "../services/getProsecutionSessionInfo";

export const useGetProsecutionSessionInfo = (caseId: number) => {
    return useQuery({
        queryKey: ["prosecution-session-info", caseId],
        queryFn: () => getProsecutionSessionInfo(caseId),
    });
};
