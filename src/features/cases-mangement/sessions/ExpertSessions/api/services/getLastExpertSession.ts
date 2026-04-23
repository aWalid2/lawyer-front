import api from "@/lib/api";
import type { ExpertSessionResponse } from "../../types/ExpertSessionApiTypes";

export const getLastExpertSession = async (
  caseId: string | number,
): Promise<ExpertSessionResponse> => {
  const response = await api.get(`/expert-reports/case/${caseId}/last`);
  return response.data;
};
