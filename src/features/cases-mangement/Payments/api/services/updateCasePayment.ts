import type { PaymentRequestPayload } from "./buildPaymentFormData";
import { updateCasePaymentMock } from "./mockCasePayments";

interface UpdateCasePaymentPayload { paymentId: string | number; data: PaymentRequestPayload }

export const updateCasePayment = async ({ paymentId, data }: UpdateCasePaymentPayload) => {
  return updateCasePaymentMock({ paymentId, data });
};
