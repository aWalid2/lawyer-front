import type { PaymentSummary } from "@/features/cases-mangement/Payments/types";
import { getCasePaymentsSummaryMock } from "./mockCasePayments";

export const getCasePaymentsSummary = async (caseId: string | number): Promise<PaymentSummary | null> => {
  const payload = await getCasePaymentsSummaryMock(caseId);
  if (!payload) return null;
  return { totalAmount: Number(payload.total_amount ?? 0), latestPaymentDate: payload.data ?? null };
};
