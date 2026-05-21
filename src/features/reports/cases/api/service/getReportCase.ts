import api from "@/lib/api";

export const fetchReportCase = async (page: number, limit: number, status?: string, search?: string) => {
  const params: any = { page, limit };

  if (status && status !== "all") {
    params.status = status;
  }

  if (search && search.trim()) {
    params.search = search;
  }

  const response = await api.get("/cases/all-cases", { params });
  return response.data;

}

