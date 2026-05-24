import api from "@/lib/api";
import type { UpdateProfilePayload, UserProfileResponse } from "../../types/profileT";

export const updateUserProfile = async (
  userId: number,
  payload: UpdateProfilePayload,
) => {
  const response = await api.patch<UserProfileResponse>(`/users/${userId}`, payload);
  return response.data;
};