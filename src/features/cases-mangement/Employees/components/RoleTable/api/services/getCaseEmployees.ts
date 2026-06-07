import api from "@/lib/api";

import { normalizeCaseEmployee } from "./normalizeCaseEmployee";

export const getCaseEmployees = async (
  caseId: string | number,
): Promise<any> => {
  const response = await api.get(`/case-employee/${caseId}`);

  if (Array.isArray(response.data)) {
    return {
      data: response.data.map(normalizeCaseEmployee),
      meta: { total: response.data.length },
    };
  }

  const data = Array.isArray(response.data?.data) ? response.data.data : [];

  return {
    data: data.map(normalizeCaseEmployee),
    meta: {
      total: response.data?.total ?? data.length,
      totalPages: response.data?.totalPages,
    },
  };
};