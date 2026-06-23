import api from "@/lib/api";
import type { UserProfileResponse } from "../../types/profileT";

export const uploadUserPhoto = async (userId: number, file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await api.post<UserProfileResponse>(
    `/users/${userId}/photo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
