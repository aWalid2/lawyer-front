
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchCases } from "../service/getCases";

export const useFetchCases = () => {
  const query = useQuery({
    queryKey: ["case-tasks"],
    queryFn: fetchCases,
    staleTime: 1000 * 60 * 2,
    retry: 2,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch cases. Please try again later.");
    }
  }, [query.error]);
  

  return query;
};