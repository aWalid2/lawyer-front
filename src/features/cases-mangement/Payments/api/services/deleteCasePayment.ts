import api from "@/lib/api";
import { deleteCasePaymentMock } from "./mockCasePayments";

export const deleteCasePayment = async (paymentId: string | number) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") return deleteCasePaymentMock(paymentId);

  const response = await api.delete(`/case-payments/${paymentId}`);
  return response.data;
};
