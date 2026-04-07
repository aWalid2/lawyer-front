import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchPoliceStations } from "../service/getPoliceStation";

export const useFetchPoliceStations = (page: number, limit: number, search?: string) => {
  const query = useQuery({
    queryKey: ["policeStations", page, limit, search],
    queryFn: () => fetchPoliceStations(page, limit, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch police stations");
    }
  }, [query.error]);
  
  return query;
};