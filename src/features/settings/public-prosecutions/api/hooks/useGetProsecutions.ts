
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchProsecutions } from "../service/getProsecutions";

export const useFetchProsecutions = (page?: number, limit?: number) => {
  const query = useQuery({
    queryKey: ["prosecutions", page, limit],
    queryFn: () => fetchProsecutions(page, limit),
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