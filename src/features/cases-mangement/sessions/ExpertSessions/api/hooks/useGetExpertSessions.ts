import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getExpertSessions } from "../services/getExpertSessions";

export const useGetExpertSessions = (caseId: string | number | undefined, page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["expert-sessions", caseId, page, limit],
    queryFn: () => getExpertSessions(caseId!, page, limit),
    enabled: !!caseId,
    retry: (_failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return _failureCount < 2;
    },
  });
};
