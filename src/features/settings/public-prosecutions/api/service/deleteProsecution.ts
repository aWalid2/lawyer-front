// prosecution/api/service/deleteProsecution.ts
import api from "@/lib/api";

export const deleteProsecution = async (id: string) => {
  const response = await api.delete(`/prosecution/${id}`);
  return response.data;
};