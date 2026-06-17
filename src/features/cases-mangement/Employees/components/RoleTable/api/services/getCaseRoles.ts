import api from "@/lib/api";
import { normalizeCaseRole } from "./normalizeCaseRole";

export const getCaseRoles = async (
  caseId: string | number,
): Promise<any> => {
  const response = await api.get(`/employee-roles/case/${caseId}`);

  if (Array.isArray(response.data)) {
    return {
      data: response.data.map(normalizeCaseRole),
      meta: { total: response.data.length },
    };
  }
  
  const data = Array.isArray(response.data?.data) ? response.data.data : [];
  
  console.log(data)
  return {
    data: data.map(normalizeCaseRole),
    meta: {
      total: response.data?.total ?? data.length,
      totalPages: response.data?.totalPages,
    },
  };
};
