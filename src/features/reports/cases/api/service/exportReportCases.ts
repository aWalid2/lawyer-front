import api from '@/lib/api';
import type { HeaderExportType } from '@/shared/components/HeaderExportMenu';


export const exportReportCases = async (
  format: HeaderExportType,
  params: { filter?: string; page?: number; limit?: number; }
): Promise<Blob> => {
  const response = await api.get(`/reports/caseReports/${format}`, {
    params: params,
    responseType: 'blob',
  });
  return response.data;
};
