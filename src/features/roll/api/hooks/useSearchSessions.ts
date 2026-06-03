import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { searchSessions } from "../service/searchSessions";

interface UseSearchSessionsParams {
  q: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export const useSearchSessions = ({
  q,
  page = 1,
  limit = 15,
  enabled = true,
}: UseSearchSessionsParams) => {
  const query = useQuery({
    queryKey: ["sessions-search", q, page, limit],
    queryFn: () => searchSessions({ q, page, limit }),
    enabled: enabled && q.trim().length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to search sessions");
    }
  }, [query.error]);

  return query;
};
