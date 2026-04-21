import api from "@/lib/api";
import type {
  ExpertSessionRequest,
  ExpertSessionResponse,
} from "../../types/ExpertSessionApiTypes";

export const updateExpertSession = async ({
  reportId,
  data,
}: {
  reportId: string | number;
  data: Partial<ExpertSessionRequest>;
}): Promise<ExpertSessionResponse> => {
  const response = await api.patch(`/expert-reports/${reportId}`, data);
  return response.data;
};
