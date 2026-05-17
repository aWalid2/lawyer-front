import type { PaymentRequestPayload } from "./buildPaymentFormData";
import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";

interface CreateCasePaymentPayload {
  caseId: string | number;
  data: PaymentRequestPayload;
}

export const createCasePayment = async ({ caseId, data }: CreateCasePaymentPayload) => {

    const response = await api.post(`/payments/${caseId}`, data);
    return normalizeCasePayment(response.data.data || response.data);

};
