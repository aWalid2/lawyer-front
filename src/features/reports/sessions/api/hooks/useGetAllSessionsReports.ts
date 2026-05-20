import { useQuery } from '@tanstack/react-query';
import { getAllSessionsReports, type GetAllSessionsParams, type GetAllSessionsResponse } from '../services/getAllSessionsReports';

export const useGetAllSessionsReports = (params: GetAllSessionsParams) => {
    return useQuery<GetAllSessionsResponse>({
        queryKey: ['sessions-reports', params],
        queryFn: () => getAllSessionsReports(params),
        staleTime: 1000 * 60 * 5,
    });
};