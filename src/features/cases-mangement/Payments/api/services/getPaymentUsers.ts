import type { UserT } from "@/features/settings/users/types/userT";
import { getPaymentUsersMock } from "./mockCasePayments";

export const getPaymentUsers = async (): Promise<UserT[]> => {
  return getPaymentUsersMock();
};
