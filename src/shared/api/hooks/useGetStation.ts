import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import {  fetchPoliceStations } from "../services/getPoliceStation";

export const useFetchPoliceStations = (page?: number, limit?: number, search?: string) => {
  const query = useQuery({
    queryKey: ["policeStations", page, limit, search],
    queryFn: () => fetchPoliceStations(page, limit, search),
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch public prosecution data");
    }
  }, [query.error]);

  return query;
};