import api from '@/lib/api';
import type { ReportSession } from '../../types';

export interface GetAllSessionsParams {
  page?: number;
  limit?: number;
  session_source?: string;
  session_type?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

export interface GetAllSessionsResponse {
  data: ReportSession[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}




export const getAllSessionsReports = async (params: GetAllSessionsParams) => {
  const { data } = await api.get<GetAllSessionsResponse>(
    '/reports/allsessions',
    { params },
  );
  return data;
};
