import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getFirstInstanceSession } from "../services/getFirstInstanceSession";

export const useGetFirstInstanceSession = (
  sessionId: number | string | undefined,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["first-instance-session-details", sessionId],
    queryFn: () => getFirstInstanceSession(sessionId!),
    enabled: !!sessionId && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};