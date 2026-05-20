import { useQuery } from '@tanstack/react-query';
import { getAllSessionsReports, type GetAllSessionsParams, type GetAllSessionsResponse } from '../services/getAllSessionsReports';


export const useGetAllSessionsReports = (params: GetAllSessionsParams, page: number) => {
    return useQuery<GetAllSessionsResponse>({
        queryKey: ['sessions-reports', page, params],
        queryFn: () => getAllSessionsReports({ ...params, page }),
    });
};