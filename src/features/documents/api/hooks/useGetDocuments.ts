// documents/api/hooks/useGetDocuments.ts
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchDocuments } from "../service/getDocuments";

export const useFetchDocuments = (page: number, limit: number, search?: string, type?: string) => {
  const query = useQuery({
    queryKey: ["documents", page, limit, search, type],
    queryFn: () => fetchDocuments(page, limit, search, type),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch documents");
    }
  }, [query.error]);
  
  return query;
};