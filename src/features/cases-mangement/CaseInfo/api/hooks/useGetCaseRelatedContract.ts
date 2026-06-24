import { useQuery } from "@tanstack/react-query";
import { getCaseRelatedContract } from "../services/getCaseRelatedContract";

export const useGetCaseRelatedContract = (caseId?: string | number) => {
  return useQuery({
    queryKey: ["caseRelatedContract", caseId],
    queryFn: () => getCaseRelatedContract(caseId!),
    enabled: !!caseId,
  });
};
