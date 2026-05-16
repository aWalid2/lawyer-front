import api from "@/lib/api";
import type { PaymentSummary } from "@/features/cases-mangement/Payments/types";
import { getCasePaymentsSummaryMock } from "./mockCasePayments";

interface SummaryResponse { total_amount?: string | number | null; data?: string | null }

export const getCasePaymentsSummary = async (caseId: string | number): Promise<PaymentSummary | null> => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    const payload = await getCasePaymentsSummaryMock(caseId);
    if (!payload) return null;
    return { totalAmount: Number(payload.total_amount ?? 0), latestPaymentDate: payload.data ?? null };
  }

  const response = await api.get<SummaryResponse>(`/case-payments/${caseId}/payments`);
  const payload = response.data;
  if (!payload) return null;
  return { totalAmount: Number(payload.total_amount ?? 0), latestPaymentDate: payload.data ?? null };
};
