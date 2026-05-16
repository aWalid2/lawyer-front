import api from "@/lib/api";
import type { CreateRoleRequest, CreateRoleResponse } from "@/features/settings/permissions/types";

export const createRole = async (payload: CreateRoleRequest): Promise<CreateRoleResponse> => {
  const response = await api.post<CreateRoleResponse>("/roles/createRole", payload);
  return response.data;
};
