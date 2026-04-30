import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getProcedure } from "../services/getProcedure";

export const useGetProcedure = (
  id: string | number | undefined,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["procedure", id],
    queryFn: () => getProcedure(id!),
    enabled: !!id && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};