import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { getAllProcedures } from "../service/getAllProcedures";

export const useGetAllProcedures = (
  page: number,
  limit: number,
  deliverDateFrom?: Date,
  deliverDateTo?: Date,
  searchTerm?: string,
) => {
  const query = useQuery({
    queryKey: ["tasks-with-case", page, limit, deliverDateFrom, deliverDateTo, searchTerm],
    queryFn: () => getAllProcedures(page, limit, deliverDateFrom, deliverDateTo, searchTerm),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch procedures");
    }
  }, [query.error]);

  return query;
};