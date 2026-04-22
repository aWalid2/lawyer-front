import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getOtherSession } from "../services/getOtherSession";

export const useGetOtherSession = (
  id: string | number | undefined,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["other-session", id],
    queryFn: () => getOtherSession(id!),
    enabled: !!id && enabled,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};
