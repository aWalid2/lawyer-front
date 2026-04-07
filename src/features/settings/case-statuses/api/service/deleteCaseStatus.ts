// case-status/api/service/deleteCaseStatus.ts
import api from "@/lib/api";

export const deleteCaseStatus = async (id: string) => {
  const response = await api.delete(`/case-status/${id}`);
  return response.data;
};