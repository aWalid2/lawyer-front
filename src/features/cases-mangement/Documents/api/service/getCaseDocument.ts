import api from "@/lib/api";

export const getCaseDocument = async (id: string) => {
  const response = await api.get(`/documnet/${id}`);
  return response.data;
};