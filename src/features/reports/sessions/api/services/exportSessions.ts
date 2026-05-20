import api from '@/lib/api';


export const exportSessions = async (
  format: 'pdf' | 'excel',
  params: Record<string, any>,
): Promise<Blob> => {
  const { data } = await api.get<Blob>(`/reports/allsessions/${format}`, {
    params,
    responseType: 'blob',
  });
  return data;
};
