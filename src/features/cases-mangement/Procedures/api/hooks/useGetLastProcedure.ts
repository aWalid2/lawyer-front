import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getLastProcedure } from "../services/getLastProcedure";

export const useGetLastProcedure = (caseId: string | undefined) => {
  return useQuery({
    queryKey: ["procedure-last", caseId],
    queryFn: () => getLastProcedure(caseId!),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};