import api from "@/lib/api";
import type { RollSessionApiResponse } from "../../types";
import { enrichSearchResults } from "./enrichSearchResults";

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

  const { data: response } = await api.get("/cases/search", {
    params: queryParams,
  });

  const rawResults = Array.isArray(response)
    ? response
    : response?.data ?? [];
  const meta = response?.meta ?? {
    total: rawResults.length,
    page: params.page ?? 1,
    limit: params.limit ?? 15,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  };

  
  const enriched = await enrichSearchResults(rawResults);

  return { data: enriched, meta };
};
