// prosecution/api/service/getProsecutions.ts
import api from "@/lib/api";

export const fetchProsecutions = async (page: number, limit: number, search?: string) => {
  const params: any = { page, limit };
  
  if (search && search.trim()) {
    params.search = search;
  }
  
  const { data } = await api.get("/prosecution", { params });
  return data;
};