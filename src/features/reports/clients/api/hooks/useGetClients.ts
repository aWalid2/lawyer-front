
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchClients } from "../service/getClients";

export const useGetClients = (page: number, limit: number, status?: string, search?: string) => {
  const query = useQuery({
    queryKey: ["client-profile", page, limit, status, search],
    queryFn: () => fetchClients(page, limit, status, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch clients. Please try again later.");
    }
  }, [query.error]);
  

  return query;
};


