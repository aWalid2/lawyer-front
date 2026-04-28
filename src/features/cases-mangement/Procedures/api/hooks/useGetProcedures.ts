import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getProcedures } from "../services/getProcedures";

export const useGetProcedures = (
  caseId: string | number | undefined,
  page?: number,
  limit?: number,
) => {
  return useQuery({
    queryKey: ["procedures", caseId, page, limit],
    queryFn: () => getProcedures(caseId!, page, limit),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};