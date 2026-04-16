import { useQuery } from "@tanstack/react-query";
import { getProsecutionSessions } from "../services/getProsecutionSessions";
import type { AxiosError } from "axios";

export const useGetProsecutionSessions = (caseId: number, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["prosecution-sessions", caseId, page],
        queryFn: () => getProsecutionSessions(caseId, page, limit),
        enabled: !!caseId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: (_failureCount, error) => {
            const axiosError = error as AxiosError;
            if (axiosError?.response?.status === 404) return false;
            return _failureCount < 2;
        },
    });
};
