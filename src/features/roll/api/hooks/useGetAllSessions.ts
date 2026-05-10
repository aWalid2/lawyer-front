import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchAllRollSessions } from "../service/getAllSessions";
import type { RollSessionsParams } from "../../types";

export const useGetAllRollSessions = (params: RollSessionsParams) => {
  const query = useQuery({
    queryKey: [
      "roll-sessions",
      params.sessionSource,
      params.dateFrom?.toISOString(),
      params.dateTo?.toISOString(),
    ],
    queryFn: () => fetchAllRollSessions(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch roll sessions");
    }
  }, [query.error]);

  return query;
};