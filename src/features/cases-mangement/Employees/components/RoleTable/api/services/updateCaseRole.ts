import api from "@/lib/api";

interface UpdateCaseRolePayload {
  id: number;
  role_id: number;
  case_id: number;
}

export const updateCaseRole = async ({ id, role_id, case_id }: UpdateCaseRolePayload) => {
  const response = await api.patch(`/employee-roles/${id}`, { role_id, case_id });
  return response.data;
};
