import api from '@/lib/api';
import type { HeaderExportType } from '@/shared/components/Header/HeaderExportMenu';


export const exportCaseExpenses = async (
  format: HeaderExportType,
  params: { expense_type?: string; date_from?: string; date_to?: string; page?: number; limit?: number; }
): Promise<Blob> => {
  const response = await api.get(`/reports/allCaseExpenses/${format}`, {
    params: params,
    responseType: 'blob',
  });
  return response.data;
};
