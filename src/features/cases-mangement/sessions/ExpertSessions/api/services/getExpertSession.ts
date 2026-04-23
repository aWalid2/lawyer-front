import api from "@/lib/api";
import type { ExpertSessionResponse } from "../../types/ExpertSessionApiTypes";

export const getExpertSession = async (
  id: string | number,
): Promise<ExpertSessionResponse> => {
  const response = await api.get(`/expert-reports/${id}`);
  return response.data;
};
