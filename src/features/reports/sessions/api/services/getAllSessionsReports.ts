import api from '@/lib/api';

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

export interface ReportSession {
  id: string;
  sessionType: string;
  judicialGrade: string;
  caseAutoNumber: string;
  clientName: string;
  lawyerName: string;
  entity: string;
  sessionDate: string;
  status: string;
  sessionDecision?: string;
}


export const getAllSessionsReports = async (params: GetAllSessionsParams) => {
  const { data } = await api.get<GetAllSessionsResponse>(
    '/reports/allsessions',
    { params },
  );
  return data;
};
