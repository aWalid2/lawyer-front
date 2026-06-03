import api from "@/lib/api";
import type { RollSessionApiResponse } from "../../types";

interface SearchSessionsParams {
  q: string;
  page?: number;
  limit?: number;
}

export const searchSessions = async (
  params: SearchSessionsParams,
): Promise<RollSessionApiResponse[]> => {
  const queryParams: Record<string, string | number> = {};

  queryParams.q = params.q;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;

  const { data } = await api.get("/sessions/search", {
    params: queryParams,
  });

  return Array.isArray(data) ? data : data?.data ?? [];
};
