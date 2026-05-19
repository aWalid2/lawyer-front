import api from "@/lib/api";
import type { UpdateUserRequest } from "../../types/addUserRequest";

export const updateUser = async (employeeId: number, userData: UpdateUserRequest) => {
  const response = await api.put(`/employee/${employeeId}`, userData);
  return response.data;
};
