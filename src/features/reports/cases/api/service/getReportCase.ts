import api from "@/lib/api";

export const fetchReportCase = async (page: number, limit: number, status?: string, search?: string) => {
  const params: any = { page, limit };

  if (status && status !== "all") {
    params.status_id = status;
  }

  if (search && search.trim()) {
    params.search = search;
  }

  const response = await api.get("/reports/caseReports", { params });
  return response.data;

}

