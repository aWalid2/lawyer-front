
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchClients } from "../servrce/getAll";

export const useFetchClients = (page: number, limit: number) => {
  const query = useQuery({
    queryKey: ["client-profile", page, limit],
    queryFn: () => fetchClients(page, limit),
    staleTime: 1000 * 60 * 2,
    retry: 2,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch clients");
    }
  }, [query.error]);
  

  return query;
};