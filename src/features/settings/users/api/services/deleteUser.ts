import api from "@/lib/api";

export const deleteUser = async (employeeId: number) => {
  const response = await api.delete(`/employee/${employeeId}`);
  return response.data;
};
