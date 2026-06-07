import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCaseEmployees } from "../services/getCaseEmployees";

export const useGetCaseEmployees = (caseId: string | number | undefined) => {
  return useQuery({
    queryKey: ["case-employees", caseId],
    queryFn: () => getCaseEmployees(caseId!),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};