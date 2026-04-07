// case-status/api/service/getCaseStatuses.ts
import api from "@/lib/api";

export const fetchCaseStatuses = async (page: number, limit: number, search?: string) => {
  const params: any = { page, limit };
  
  if (search && search.trim()) {
    params.search = search;
  }
  
  const { data } = await api.get("/case-status", { params });
  return data;
};