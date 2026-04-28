import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getExpertSession } from "../services/getExpertSession";

export const useGetExpertSession = (
  id: string | number | undefined,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["expert-session", id],
    queryFn: () => getExpertSession(id!),
    enabled: enabled && !!id,
    retry: (_failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return _failureCount < 2;
    },
  });
};
