import { useQuery } from "@tanstack/react-query";
import { getCaseDocument } from "../service/getCaseDocument";

export const useGetCaseDocument = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["case-document", id],
    queryFn: () => getCaseDocument(id),
    enabled: enabled && !!id,
  });
};