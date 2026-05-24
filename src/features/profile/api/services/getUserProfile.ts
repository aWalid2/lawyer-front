import api from "@/lib/api";
import type { UserProfileResponse } from "../../types/profileT";

export const getUserProfile = async (userId: number) => {
  const response = await api.get<UserProfileResponse>(`/users/${userId}`);
  return response.data;
};