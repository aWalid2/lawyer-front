import api from "@/lib/api";

interface DeleteCaseRolePayload {
  role_id: number;
  case_id: number;
}

export const deleteCaseRole = async ({ role_id, case_id }: DeleteCaseRolePayload) => {
  const response = await api.delete(`/employee-roles/${role_id}/case/${case_id}`);
  return response.data;
};
