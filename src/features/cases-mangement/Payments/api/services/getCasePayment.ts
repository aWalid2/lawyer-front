import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";
import { getCasePaymentMock } from "./mockCasePayments";

export const getCasePayment = async (paymentId: string | number) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") return getCasePaymentMock(paymentId);

  const response = await api.get(`/case-payments/${paymentId}`);
  const payload = response.data?.data ?? response.data;
  return normalizeCasePayment(payload);
};
