import api from "@/lib/api";
import type { RollSessionApiResponse } from "../../types";

interface SearchSessionsParams {
  q: string;
  page?: number;
  limit?: number;
}

export interface SearchSessionsResult {
  data: RollSessionApiResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export const searchSessions = async (
  params: SearchSessionsParams,
): Promise<SearchSessionsResult> => {
  const queryParams: Record<string, string | number> = {};

  queryParams.q = params.q;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;

  const { data: response } = await api.get("/sessions/search", {
    params: queryParams,
  });

  const data = Array.isArray(response)
    ? response
    : response?.data ?? [];
  const meta = response?.meta ?? {
    total: data.length,
    page: params.page ?? 1,
    limit: params.limit ?? 15,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  };

  return { data, meta };
};
