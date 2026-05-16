import api from "@/lib/api";
import type { UserT } from "@/features/settings/users/types/userT";
import { getPaymentUsersMock } from "./mockCasePayments";

export const getPaymentUsers = async () => {
  if (import.meta.env.VITE_USE_MOCKS === "true") return getPaymentUsersMock();
  const { data } = await api.get<UserT[]>("/users/allUsers");
  return data;
};
