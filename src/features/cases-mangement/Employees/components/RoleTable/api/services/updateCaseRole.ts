import api from "@/lib/api";

interface UpdateCaseRolePayload {
  case_id: number;
  role_id: number;
}

export const updateCaseRole = async ({ case_id, role_id }: UpdateCaseRolePayload) => {
  const response = await api.patch(`/employee-roles/case/${case_id}/role/${role_id}`);
  return response.data;
};
