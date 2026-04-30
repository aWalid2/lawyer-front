import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getPoliceSession } from "../services/getPoliceSession";

export const useGetPoliceSession = (
  id: number | string | undefined,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["police-session", id],
    queryFn: () => getPoliceSession(id!),
    enabled: !!id && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};