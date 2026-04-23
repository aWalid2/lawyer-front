import api from "@/lib/api";
import type {
  ExpertSessionRequest,
  ExpertSessionResponse,
} from "../../types/ExpertSessionApiTypes";

export const createExpertSession = async ({
  caseId,
  data,
}: {
  caseId: string | number;
  data: ExpertSessionRequest;
}): Promise<ExpertSessionResponse> => {
  const response = await api.post(`/expert-reports/case/${caseId}`, data);
  return response.data;
};
