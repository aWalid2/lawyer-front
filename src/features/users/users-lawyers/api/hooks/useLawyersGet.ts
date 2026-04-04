
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchLawyers } from "../service/getLawters";

export const useFetchLawyers = () => {
  const query = useQuery({
    queryKey: ["lawyers"],
    queryFn: fetchLawyers,
    staleTime: 1000 * 60 * 2,
    retry: 2,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch lawyers");
    }
  }, [query.error]);
  

  return query;
};