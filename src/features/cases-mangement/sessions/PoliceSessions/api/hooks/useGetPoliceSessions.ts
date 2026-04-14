import { useQuery } from "@tanstack/react-query";
import { getPoliceSessions } from "../services/getPoliceSessions";

export const useGetPoliceSessions = (caseId: number, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["police-sessions", page],
        queryFn: () => getPoliceSessions(caseId, page, limit),
    });
};