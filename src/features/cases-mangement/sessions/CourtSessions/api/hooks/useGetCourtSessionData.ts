import { useQuery } from "@tanstack/react-query";
import { getCourtSessionData } from "../services/getCourtSessionData";
import type { AxiosError } from "axios";

export const useGetCourtSessionData = (id: string | number, level: string) => {
  return useQuery({
    queryKey: ["court-session-data", id, level],
    queryFn: () => getCourtSessionData(id, level),
    retry: (_failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return _failureCount < 2;
    },
  });
};
