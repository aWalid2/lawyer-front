import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchReportCase } from "../service/getReportCase";

export const useReportCase = (page: number, limit: number, status?: string, search?: string) => {
  const query = useQuery({
    queryKey: ["report-case", page, limit, status, search],
    queryFn: () => fetchReportCase(page, limit, status, search),
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

