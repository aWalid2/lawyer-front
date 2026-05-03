import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCaseExpenses } from "../services/getCaseExpenses";

export const useGetCaseExpenses = (caseId: string | number | undefined) => {
  return useQuery({
    queryKey: ["case-expenses", caseId],
    queryFn: () => getCaseExpenses(caseId!),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};