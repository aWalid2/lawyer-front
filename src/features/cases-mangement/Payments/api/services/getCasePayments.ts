import type { PaymentItem } from "@/features/cases-mangement/Payments/types";
import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";

interface PaymentListResponse {
  data: PaymentItem[];
  meta: { total: number; page?: number; limit?: number; total_pages?: number };
}

export const getCasePayments = async (caseId: string | number): Promise<PaymentListResponse> => {
  try {
    const response = await api.get(`/payments/case/${caseId}`);
    const { data, meta } = response.data;
    return {
      data: Array.isArray(data) ? data.map(normalizeCasePayment) : [],
      meta: {
        total: meta?.total ?? 0,
        page: meta?.page ?? 1,
        limit: meta?.limit ?? 15,
        total_pages: meta?.total_pages ?? 1,
      },
    };
  } catch (error) {
    console.error("Error fetching case payments:", error);
    throw error;
  }
};
