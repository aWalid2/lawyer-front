import type { PaymentRequestPayload } from "./buildPaymentFormData";
import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";

interface UpdateCasePaymentPayload {
  paymentId: string | number;
  data: PaymentRequestPayload;
}

export const updateCasePayment = async ({ paymentId, data }: UpdateCasePaymentPayload) => {
  try {
    const response = await api.put(`/payments/${paymentId}`, data);
    return normalizeCasePayment(response.data.data || response.data);
  } catch (error) {
    console.error("Error updating case payment:", error);
    throw error;
  }
};
