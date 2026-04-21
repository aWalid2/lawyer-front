import api from "@/lib/api";
import type { ExpertSessionListResponse } from "../../types/ExpertSessionApiTypes";

export const getExpertSessions = async (
  caseId: string | number,
  page?: number,
  limit?: number
): Promise<ExpertSessionListResponse> => {
  const response = await api.get(`/expert-reports/case/${caseId}`, { params: { page, limit } });

  if (Array.isArray(response.data)) {
    return { data: response.data, meta: { total: response.data.length } };
  }
  return response.data;
};
