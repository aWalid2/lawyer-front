import api from "@/lib/api";
import type { AddUserRequest } from "../../types/addUserRequest";

export const addUser = async (userData: AddUserRequest) => {
  const response = await api.post("/add-user", userData);
  return response.data;
};
