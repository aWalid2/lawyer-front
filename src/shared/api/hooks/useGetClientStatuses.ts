import { useQuery } from "@tanstack/react-query";
import { getClientStatuses } from "../services/getClientStatuses";

export const useGetClientStatuses = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["client-statuses", page, limit],
    queryFn: () => getClientStatuses(page, limit),
  });
};
