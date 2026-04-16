import { useQuery } from "@tanstack/react-query";
import { getProsecutionSessionInfo } from "../services/getProsecutionSessionInfo";
import type { AxiosError } from "axios";

export const useGetProsecutionSessionInfo = (caseId: number) => {
    return useQuery({
        queryKey: ["prosecution-session-info", caseId],
        queryFn: () => getProsecutionSessionInfo(caseId),
        retry: (_failureCount, error) => {
            const axiosError = error as AxiosError;
            if (axiosError?.response?.status === 404) return false;
            return _failureCount < 2;
        },
    });
};

