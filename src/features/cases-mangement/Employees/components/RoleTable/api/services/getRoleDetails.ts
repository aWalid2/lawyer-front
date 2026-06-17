import api from "@/lib/api";

export interface RoleUser {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
}

export interface RoleDetailsResponse {
  id: number;
  role_name: string;
  users: RoleUser[];
}

export const getRoleDetails = async (roleId: number): Promise<RoleDetailsResponse> => {
  const response = await api.get<RoleDetailsResponse>(`/roles/${roleId}`);
  return response.data;
};
