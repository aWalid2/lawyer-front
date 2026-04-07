// case-status/api/service/updateCaseStatus.ts
import api from "@/lib/api";

export const updateCaseStatus = async (id: string, data: any) => {
  const response = await api.patch(`/case-status/${id}`, data);
  return response.data;
};