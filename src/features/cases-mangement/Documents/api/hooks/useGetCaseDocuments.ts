import { useQuery } from "@tanstack/react-query";
import { getCaseDocuments } from "../service/getCaseDocuments";

export const useGetCaseDocuments = (caseId: string) => {
  return useQuery({
    queryKey: ["case-documents", caseId],
    queryFn: () => getCaseDocuments(caseId),
    enabled: !!caseId,
  });
};