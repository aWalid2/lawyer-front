import api from "@/lib/api";

export const deleteCaseRole = async (id: number) => {
  const response = await api.delete(`/employee-roles/${id}`);
  return response.data;
};
