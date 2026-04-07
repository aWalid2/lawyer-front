// prosecution/api/service/updateProsecution.ts
import api from "@/lib/api";

export const updateProsecution = async (id: string, data: any) => {
  const response = await api.patch(`/prosecution/${id}`, data);
  return response.data;
};