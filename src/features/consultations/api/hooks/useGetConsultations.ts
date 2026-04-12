
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { getConsultations } from "../service/getConsultations";

export const useFetchConsultations = (page: number, limit: number, status?: string, search?: string) => {
  const query = useQuery({
    queryKey: ["consultations", page, limit, status, search],
    queryFn: () => getConsultations(page, limit, status, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch consultations. Please try again later.");
    }
  }, [query.error]);
  

  return query;
};


