import api from "@/lib/api";
import type { UpdateRoleRequest, UpdateRoleResponse } from "../../types";

export const updateRole = async (id: string | number, payload: UpdateRoleRequest): Promise<UpdateRoleResponse> => {
  const response = await api.patch<UpdateRoleResponse>(`/roles/updateRole/${id}`, payload);
  return response.data;
};
