import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchTasks } from "../service/getTasks";

export const useFetchTasks = (
  page: number,
  limit: number,
  deliverDateFrom?: Date,
  deliverDateTo?: Date,
  searchTerm?: string,
) => {
  const query = useQuery({
    queryKey: ["tasks", page, limit, deliverDateFrom, deliverDateTo, searchTerm],
    queryFn: () => fetchTasks(page, limit, deliverDateFrom, deliverDateTo, searchTerm),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch tasks");
    }
  }, [query.error]);

  return query;
};