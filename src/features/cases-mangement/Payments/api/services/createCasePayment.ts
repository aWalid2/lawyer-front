import type { PaymentRequestPayload } from "./buildPaymentFormData";
import { createCasePaymentMock } from "./mockCasePayments";

interface CreateCasePaymentPayload { caseId: string | number; data: PaymentRequestPayload }

export const createCasePayment = async ({ caseId, data }: CreateCasePaymentPayload) => {
  return createCasePaymentMock({ caseId, data });
};
