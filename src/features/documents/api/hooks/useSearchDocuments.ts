import { useQuery } from "@tanstack/react-query";
import { searchDocuments } from "../service/searchDocuments";

export const useSearchDocuments = (
  q: string,
  page: number = 1,
  limit: number = 15,
  classification?: string,
) => {
  return useQuery({
    queryKey: ["documents-search", q, page, limit, classification],
    queryFn: () => searchDocuments(q, page, limit, classification),
    enabled: q.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });
};
