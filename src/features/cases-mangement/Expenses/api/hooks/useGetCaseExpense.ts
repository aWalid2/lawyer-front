import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCaseExpense } from "../services/getCaseExpense";

export const useGetCaseExpense = (
  expenseId: string | number | null | undefined,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["case-expense", expenseId],
    queryFn: () => getCaseExpense(expenseId!),
    enabled: enabled && !!expenseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};