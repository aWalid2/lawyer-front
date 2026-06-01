import api from "@/lib/api";

type CaseStatusT = {
  id: number | string;
  name: string;
};

type CaseStatusesResponse = {
  data: CaseStatusT[];
  meta: {
    total_pages: number;
    total?: number;
    page?: number;
  };
};

export const fetchCaseStatuses = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<CaseStatusesResponse> => {
  const params: Record<string, any> = { page, limit };

  if (search && search.trim()) {
    params.search = search;
  }

  const response = await api.get("/case-status", { params });
  const resp = response.data as any;

  return {
    data: resp.data ?? [],
    meta: {
      total_pages: resp.lastPage ?? resp.meta?.total_pages ?? 1,
      total: resp.total ?? resp.meta?.total ?? (resp.data ? resp.data.length : 0),
      page: resp.page ?? 1,
    },
  };
};