import api from '@/lib/api';
import type { HeaderExportType } from '@/shared/components/HeaderExportMenu';


export const exportReportCases = async (
  format: HeaderExportType,
  params: { filter?: string; searchTerm?: string; page?: number; limit?: number; }
): Promise<Blob> => {
  const query: any = {};

  if (params.filter && params.filter !== "all") {
    query.status_id = params.filter;
  }

  if (params.searchTerm?.trim()) {
    query.search = params.searchTerm;
  }

  if (params.page) {
    query.page = params.page;
  }

  if (params.limit) {
    query.limit = params.limit;
  }

  const response = await api.get(`/reports/caseReports/${format}`, {
    params: query,
    responseType: "blob",
  });
  return response.data;
};
