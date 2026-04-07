// case-status/api/hooks/useGetCaseStatuses.ts
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchCaseStatuses } from "../service/getCaseStatuses";

export const useFetchCaseStatuses = (page: number, limit: number, search?: string) => {
  const query = useQuery({
    queryKey: ["caseStatuses", page, limit, search],
    queryFn: () => fetchCaseStatuses(page, limit, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch case statuses");
    }
  }, [query.error]);
  
  return query;
};