import api from '@/lib/api';
import type { HeaderExportType } from '@/shared/components/HeaderExportMenu';


export const exportUserReports = async (
  format: HeaderExportType,
  params: { status?: string; role_id?: string }
): Promise<Blob> => {
  const response = await api.get(`/reports/userReports/${format}`, {
    params: params,
    responseType: 'blob',
  });
  return response.data;
};
