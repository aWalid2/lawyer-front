import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getLastOtherSession } from "../services/getLastOtherSession";

export const useGetLastOtherSession = (caseId: string | undefined) => {
  return useQuery({
    queryKey: ["other-session-last", caseId],
    queryFn: () => getLastOtherSession(caseId!),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};
