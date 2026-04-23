import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getLastExpertSession } from "../services/getLastExpertSession";

export const useGetLastExpertSession = (caseId: string | undefined) => {
  return useQuery({
    queryKey: ["expert-session-last", caseId],
    queryFn: () => getLastExpertSession(caseId!),
    enabled: !!caseId,
    retry: (_failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return true;
    },
  });
};
