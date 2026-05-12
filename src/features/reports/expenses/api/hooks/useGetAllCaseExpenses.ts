import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllCaseExpenses,
  type GetAllCaseExpensesParams,
} from "../service/getAllCaseExpenses";

export const useGetAllCaseExpenses = (params: GetAllCaseExpensesParams) => {
  const query = useQuery({
    queryKey: [
      "reports-all-case-expenses",
      params.page,
      params.limit,
      params.dateFrom?.toISOString(),
      params.dateTo?.toISOString(),
    ],
    queryFn: () => getAllCaseExpenses(params),
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