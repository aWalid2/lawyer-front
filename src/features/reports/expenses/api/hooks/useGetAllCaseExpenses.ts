import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllCaseExpenses } from "../service/getAllCaseExpenses";

export const useGetAllCaseExpenses = (page: number, limit: number) => {
  const query = useQuery({
    queryKey: ["reports-all-case-expenses", page, limit],
    queryFn: () => getAllCaseExpenses(page, limit),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(
        query.error.message || "Failed to fetch expense reports. Please try again later.",
      );
    }
  }, [query.error]);

  return query;
};