import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchTasks } from "../service/getTasks";

export const useFetchTasks = (page: number, limit: number, status?: string, search?: string) => {
  const query = useQuery({
    queryKey: ["tasks", page, limit, status, search],
    queryFn: () => fetchTasks(page, limit, status, search),
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