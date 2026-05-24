import { useQuery } from "@tanstack/react-query";
import { getAllUserReports, type PaginatedUserReportResponse } from "../services/getAllUserReports";

type GetAllUserReportsParams = {
  status?: string;
  role_id?: string;
  page?: number;
  limit?: number;
};

export const useGetAllUserReports = (params?: GetAllUserReportsParams) => {
  return useQuery<PaginatedUserReportResponse>({
    queryKey: ["userReports", params],
    queryFn: () => getAllUserReports(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
