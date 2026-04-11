
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchProsecutions } from "../services/getProsecutions";

export const useFetchProsecutions = (page?: number, limit?: number, search?: string) => {
  const query = useQuery({
    queryKey: ["prosecutions", page, limit, search],
    queryFn: () => fetchProsecutions(page, limit, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch prosecutions");
    }
  }, [query.error]);
  
  return query;
};