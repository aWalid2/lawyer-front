import api from "@/lib/api";
import type { CaseTypeT } from "../../types/casesT";

export const getCaseTypes = async (
  page?: number,
  limit?: number,
  search?: string,
) => {
  const params: any = { page, limit };
  if (search && search.trim()) {
    params.search = search;
  }
  const response = await api.get(`/case-type`, { params });
  const resp = response.data as any;

  return {
    data: resp.data ?? [],
    meta: {
      total_pages: resp.lastPage ?? resp.meta?.total_pages ?? 1,
      total: resp.total ?? resp.meta?.total ?? (resp.data ? resp.data.length : 0),
      page: resp.page ?? 1,
    },
  } as { data: CaseTypeT[]; meta: { total_pages: number; total?: number; page?: number } };
};
