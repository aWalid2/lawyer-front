import api from "@/lib/api";

interface CreateCaseRolePayload {
  role_id: number;
  case_id: number;
}

export const createCaseRole = async (data: CreateCaseRolePayload) => {
  const response = await api.post("/employee-roles", data);
  return response.data;
};
