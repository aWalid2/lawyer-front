import { useQuery } from "@tanstack/react-query";
import { getClientStatusCount } from "../services/getClientStatusCount";

type ClientStatusCountQueryData = number | { clientCount?: number };

export const useGetClientStatusCount = (id: string) => {
  return useQuery<number, Error, number, [string, string]>({
    queryKey: ["client-status-count-v2", id],
    queryFn: () => getClientStatusCount(id),
    enabled: Boolean(id),
    select: (data: ClientStatusCountQueryData) => {
      if (typeof data === "number") {
        return data;
      }

      return data.clientCount ?? 0;
    },
  });
};