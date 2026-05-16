import { useQuery } from "@tanstack/react-query";
import { getCasePaymentsSummary } from "../services/getCasePaymentsSummary";

export const useGetCasePaymentsSummary = (caseId: string | number | undefined) => {
  return useQuery({ queryKey: ["case-payments-summary", caseId], queryFn: () => getCasePaymentsSummary(caseId!), enabled: !!caseId });
};
