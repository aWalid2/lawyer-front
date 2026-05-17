import api from "@/lib/api";
import type { UserT } from "@/features/settings/users/types/userT";

export const getPaymentUsers = async (): Promise<UserT[]> => {
  try {
    const { data } = await api.get<UserT[]>("/users/allUsers");
    return data;
  } catch (error) {
    console.error("Error fetching payment users:", error);
    throw error;
  }
};
