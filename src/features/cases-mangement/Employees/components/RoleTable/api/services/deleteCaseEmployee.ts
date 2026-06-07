import api from "@/lib/api";

export const deleteCaseEmployee = async (id: number) => {
  const response = await api.delete(`/case-employee/${id}`);
  return response.data;
};