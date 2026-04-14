import { useQuery } from "@tanstack/react-query";
import { getProsecutionSessions } from "../services/getProsecutionSessions";

export const useGetProsecutionSessions = (caseId: number, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["prosecution-sessions", caseId, page],
        queryFn: () => getProsecutionSessions(caseId, page, limit),
    });
};
