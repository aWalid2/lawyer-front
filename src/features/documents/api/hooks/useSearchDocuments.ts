import { useQuery } from "@tanstack/react-query";
import { searchDocuments } from "../service/searchDocuments";

export const useSearchDocuments = (
  q: string,
  page: number = 1,
  limit: number = 15,
) => {
  return useQuery({
    queryKey: ["documents-search", q, page, limit],
    queryFn: () => searchDocuments(q, page, limit),
    enabled: q.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });
};
