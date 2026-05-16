import { getCasePaymentMock } from "./mockCasePayments";

export const getCasePayment = async (paymentId: string | number) => {
  return getCasePaymentMock(paymentId);
};
