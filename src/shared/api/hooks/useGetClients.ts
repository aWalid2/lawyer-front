
import { useQuery } from "@tanstack/react-query";
import { fetchClients} from '../services/getClients';
import { toast } from "sonner";
import { useEffect } from "react";

export const useFetchClients = (page?: number, limit?: number, search?: string, enabled = true) => {
  const query = useQuery({
    queryKey: ["client-profile", page, limit, search],
    queryFn: () => fetchClients(page, limit, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,
    enabled,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch clients");
    }
  }, [query.error]);
  

  return query;
};