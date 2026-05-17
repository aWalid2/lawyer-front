import type { PaymentSummary } from "@/features/cases-mangement/Payments/types";
import api from "@/lib/api";

export const getCasePaymentsSummary = async (caseId: string | number): Promise<PaymentSummary | null> => {
  try {
    const response = await api.get(`/payments/case/${caseId}/summary`);
    const data = response.data;
    return {
      totalAmount: Number(data.total_amount ?? 0),
      latestPaymentDate: data.last_payment_date ?? null,
    };
  } catch (error) {
    console.error("Error fetching case payments summary:", error);
    throw error;
  }
};
