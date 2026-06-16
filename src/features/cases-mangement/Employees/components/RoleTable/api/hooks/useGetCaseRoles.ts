import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCaseRoles } from "../services/getCaseRoles";

export const useGetCaseRoles = (caseId: string | number | undefined) => {
  return useQuery({
    queryKey: ["case-roles", caseId],
    queryFn: () => getCaseRoles(caseId!),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};
