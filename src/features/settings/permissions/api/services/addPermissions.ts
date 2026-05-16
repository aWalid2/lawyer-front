import api from "@/lib/api";
import type { AddPermissionsRequest, AddPermissionsResponse } from "@/features/settings/permissions/types";

export const addPermissions = async (payload: AddPermissionsRequest): Promise<AddPermissionsResponse> => {
  const response = await api.post<AddPermissionsResponse>("/roles/add-permissions", payload);
  return response.data;
};
