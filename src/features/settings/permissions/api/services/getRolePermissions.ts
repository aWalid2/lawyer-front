import api from "@/lib/api";
import type { RolePermission } from "../../types";

export const getRolePermissions = async (roleId: number): Promise<RolePermission> => {
  const response = await api.get<RolePermission>(`/roles/${roleId}/permissions`);
  return response.data;
};
