import api from "@/lib/api";
import type { PaymentRequestPayload } from "./buildPaymentFormData";
import { updateCasePaymentMock } from "./mockCasePayments";

interface UpdateCasePaymentPayload { paymentId: string | number; data: PaymentRequestPayload }

export const updateCasePayment = async ({ paymentId, data }: UpdateCasePaymentPayload) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") return updateCasePaymentMock({ paymentId, data });

  const response = await api.patch(`/case-payments/${paymentId}`, data, data instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined);
  return response.data;
};
