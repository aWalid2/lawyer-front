import api from "@/lib/api";
import type { PaymentItem } from "@/features/cases-mangement/Payments/types";
import { normalizeCasePayment } from "./normalizeCasePayment";
import { getCasePaymentsMock } from "./mockCasePayments";

interface PaymentListResponse {
  data: PaymentItem[];
  meta: { total: number; page?: number; limit?: number; totalPages?: number };
}

export const getCasePayments = async (caseId: string | number): Promise<PaymentListResponse> => {
  if (import.meta.env.VITE_USE_MOCKS === "true") return getCasePaymentsMock(caseId);

  const response = await api.get(`/case-payments/case/${caseId}`);
  const data = Array.isArray(response.data?.data) ? response.data.data : Array.isArray(response.data) ? response.data : [];
  return {
    data: data.map(normalizeCasePayment),
    meta: { total: response.data?.meta?.total ?? data.length, page: response.data?.meta?.page, limit: response.data?.meta?.limit, totalPages: response.data?.meta?.totalPages },
  };
};
