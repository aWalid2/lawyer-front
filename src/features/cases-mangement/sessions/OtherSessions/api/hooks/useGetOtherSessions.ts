import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getOtherSessions } from "../services/getOtherSessions";

export const useGetOtherSessions = (
  caseId: string | number | undefined,
  page?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ["other-sessions", caseId, page, limit],
    queryFn: () => getOtherSessions(caseId!, page, limit),
    enabled: !!caseId,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};
