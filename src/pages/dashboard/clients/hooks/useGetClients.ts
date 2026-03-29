
import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../services/getClients";
import { toast } from "sonner";
import { useEffect } from "react";

export const useFetchClients = () => {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
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