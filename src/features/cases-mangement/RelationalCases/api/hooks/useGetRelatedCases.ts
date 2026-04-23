import { useQuery } from "@tanstack/react-query";
import { getRelatedCases } from "../services/getRelatedCases";

export const useGetRelatedCases = (caseId: string) => {
  return useQuery({
    queryKey: ["relatedCases", caseId],
    queryFn: () => getRelatedCases(caseId),
    enabled: Boolean(caseId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};