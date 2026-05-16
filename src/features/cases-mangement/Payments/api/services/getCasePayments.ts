import type { PaymentItem } from "@/features/cases-mangement/Payments/types";
import { getCasePaymentsMock } from "./mockCasePayments";

interface PaymentListResponse {
  data: PaymentItem[];
  meta: { total: number; page?: number; limit?: number; totalPages?: number };
}

export const getCasePayments = async (caseId: string | number): Promise<PaymentListResponse> => {
  return getCasePaymentsMock(caseId);
};
