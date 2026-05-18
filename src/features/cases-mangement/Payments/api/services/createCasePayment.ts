import type { PaymentFormValues } from "@/features/cases-mangement/Payments/types";
import { buildPaymentFormData } from "./buildPaymentFormData";
import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";

interface CreateCasePaymentPayload {
  caseId: string | number;
  data: PaymentFormValues;
}

export const createCasePayment = async ({ caseId, data }: CreateCasePaymentPayload) => {
  const formData = buildPaymentFormData(data);
  const response = await api.post(`/payments/${caseId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return normalizeCasePayment(response.data.data || response.data);
};
