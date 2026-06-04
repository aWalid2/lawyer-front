import api from "@/lib/api";

export const fetchReportCase = async (page: number, limit: number, status?: string, search?: string) => {
  if (search && search.trim()) {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("q", search);

    const response = await api.get(`cases/search?${params.toString()}`);
    const searchData = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];

    const transformedData = searchData.map((item: any) => ({
      ...item,
      id: item.id || item.case_sequence,
      reference_number: item.reference_number ?? item.refernce_number ?? "",
      client: {
        first_name: item.client_name ?? item.client?.first_name ?? "",
      },
      case_type: {
        name: item.case_type?.name ?? item.case_type ?? "",
      },
      caseStatus: {
        name: item.case_Status ?? item.caseStatus?.name ?? "",
      },
    }));

    return {
      data: transformedData,
      meta: response.data?.meta || { total_pages: 1, limit },
    };
  }

  const params: any = { page, limit };

  if (status && status !== "all") {
    params.status_id = status;
  }

  const response = await api.get("/reports/caseReports", { params });
  return response.data;
};

