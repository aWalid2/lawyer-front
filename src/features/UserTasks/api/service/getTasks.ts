import api from "@/lib/api";

export const fetchTasks = async (page: number, limit: number, status?: string, search?: string) => {
  const params: any = { page, limit };
  
  if (status && status !== "all") {
    params.status = status;
  }
  
  if (search && search.trim()) {
    params.search = search;
  }
  
  const { data } = await api.get("task", { params });
  return data;
};