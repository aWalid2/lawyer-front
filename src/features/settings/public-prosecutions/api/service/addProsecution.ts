// prosecution/api/service/addProsecution.ts
import api from "@/lib/api";

export const addProsecution = async (data: any) => {
  const response = await api.post("/prosecution", data);
  return response.data;
};