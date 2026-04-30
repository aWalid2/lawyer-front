import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCassationSession } from "../services/getCassationSession";

export const useGetCassationSession = (
  sessionId: number | string | undefined,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["cassation-session-details", sessionId],
    queryFn: () => getCassationSession(sessionId!),
    enabled: !!sessionId && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};