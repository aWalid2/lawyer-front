// documents/api/hooks/useGetDocument.ts
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { getDocument } from "../service/getDocument";

export const useGetDocument = (id: string) => {
  const query = useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocument(id),
    enabled: !!id,
    retry: 1,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch document");
    }
  }, [query.error]);
  
  return query;
};