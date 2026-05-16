import api from "@/lib/api";
import type { PaymentRequestPayload } from "./buildPaymentFormData";
import { createCasePaymentMock } from "./mockCasePayments";

interface CreateCasePaymentPayload { caseId: string | number; data: PaymentRequestPayload }

export const createCasePayment = async ({ caseId, data }: CreateCasePaymentPayload) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") return createCasePaymentMock({ caseId, data });

  const response = await api.post(`/case-payments/${caseId}`, data, data instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined);
  return response.data;
};
