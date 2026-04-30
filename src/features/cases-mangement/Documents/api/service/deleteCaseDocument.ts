import api from "@/lib/api";

export const deleteCaseDocument = async (id: number) => {
  const response = await api.delete(`/documnet/${id}`);
  return response.data;
};