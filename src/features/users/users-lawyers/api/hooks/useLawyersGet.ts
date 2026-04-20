
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchLawyers } from "../service/getLawters";

export const useFetchLawyers = (enabled?: boolean) => {
  const query = useQuery({
    queryKey: ["lawyers"],
    queryFn: fetchLawyers,
    staleTime: 1000 * 60 * 2,
    retry: 2,
    enabled,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch lawyers");
    }
  }, [query.error]);
  

  return query;
};