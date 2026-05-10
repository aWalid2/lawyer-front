import api from "@/lib/api";
import type { UserT } from "@/features/settings/users/types/userT";

export const getExpenseUsers = async () => {
  const { data } = await api.get<UserT[]>("/users/allUsers");
  return data;
};