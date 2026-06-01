import { useQuery } from "@tanstack/react-query";
import { getCaseTypes } from "../services/getCaseTypes";

export const useGetCaseTypes = (
  page?: number,
  limit?: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["case-types", page, limit, search],
    queryFn: () => getCaseTypes(page, limit, search),
  });
};
