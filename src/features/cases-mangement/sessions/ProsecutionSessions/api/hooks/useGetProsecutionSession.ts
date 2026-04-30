import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getProsecutionSession } from "../services/getProsecutionSession";

export const useGetProsecutionSession = (
  id: number | string | undefined,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["prosecution-session", id],
    queryFn: () => getProsecutionSession(id!),
    enabled: !!id && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};