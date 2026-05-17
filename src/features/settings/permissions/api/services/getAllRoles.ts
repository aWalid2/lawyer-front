import api from "@/lib/api";
import type { RoleResponse } from "../../types";

export const getAllRoles = async (): Promise<RoleResponse[]> => {
  const response = await api.get<RoleResponse[]>("/roles/allRoles");
  return response.data;
};
