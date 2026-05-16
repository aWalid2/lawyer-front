import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCasePayments } from "../services/getCasePayments";

export const useGetCasePayments = (caseId: string | number | undefined) => {
  return useQuery({ queryKey: ["case-payments", caseId], queryFn: () => getCasePayments(caseId!), enabled: !!caseId, retry: (failureCount, error) => { const axiosError = error as AxiosError; if (axiosError?.response?.status === 404) return false; return failureCount < 2; }, });
};
