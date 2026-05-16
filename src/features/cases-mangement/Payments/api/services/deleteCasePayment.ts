import { deleteCasePaymentMock } from "./mockCasePayments";

export const deleteCasePayment = async (paymentId: string | number) => {
  return deleteCasePaymentMock(paymentId);
};
