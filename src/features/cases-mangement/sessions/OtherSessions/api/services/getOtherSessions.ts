import api from "@/lib/api";
import type { OtherSessionListResponse } from "../../types/typesOther";
import { normalizeOtherSession } from "./normalizeOtherSession";

export const getOtherSessions = async (
  caseId: string | number,
  page?: number,
  limit?: number
): Promise<OtherSessionListResponse> => {
  const response = await api.get(`/procedures/case/${caseId}`, {
    params: { page, limit },
  });

  if (Array.isArray(response.data)) {
    return {
      data: response.data.map(normalizeOtherSession),
      meta: { total: response.data.length },
    };
  }

  return {
    data: (response.data?.data || []).map(normalizeOtherSession),
    meta: {
      total: response.data?.total ?? response.data?.data?.length ?? 0,
      totalPages: response.data?.totalPages,
    },
  };
};
