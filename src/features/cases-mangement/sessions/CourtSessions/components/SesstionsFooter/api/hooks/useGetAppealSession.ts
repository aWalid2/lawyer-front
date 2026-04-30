import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getAppealSession } from "../services/getAppealSession";

export const useGetAppealSession = (
  sessionId: number | string | undefined,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["appeal-session-details", sessionId],
    queryFn: () => getAppealSession(sessionId!),
    enabled: !!sessionId && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};