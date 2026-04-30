import api from "@/lib/api";
import type { ProcedureListResponse } from "../../types";
import { normalizeProcedure } from "./normalizeProcedure";

export const getProcedures = async (
  caseId: string | number,
  page?: number,
  limit?: number,
): Promise<ProcedureListResponse> => {
  const response = await api.get(`/procedures/case/${caseId}`, {
    params: { page, limit },
  });

  if (Array.isArray(response.data)) {
    return {
      data: response.data.map(normalizeProcedure),
      meta: { total: response.data.length },
    };
  }

  return {
    data: (response.data?.data || []).map(normalizeProcedure),
    meta: {
      total: response.data?.total ?? response.data?.data?.length ?? 0,
      totalPages: response.data?.totalPages,
    },
  };
};