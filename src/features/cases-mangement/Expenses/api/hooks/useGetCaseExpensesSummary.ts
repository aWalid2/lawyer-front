import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCaseExpensesSummary } from "../services/getCaseExpensesSummary";

export const useGetCaseExpensesSummary = (
  caseId: string | number | undefined,
) => {
  return useQuery({
    queryKey: ["case-expenses-summary", caseId],
    queryFn: () => getCaseExpensesSummary(caseId!),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};