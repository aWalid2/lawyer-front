import { useQuery } from "@tanstack/react-query";
import { getAllUserReports } from "../services/getAllUserReports";

type GetAllUserReportsParams = {
  status?: string;
  role_id?: string;
};

export const useGetAllUserReports = (params?: GetAllUserReportsParams) => {
  return useQuery<any[]>({
    queryKey: ["userReports", params],
    queryFn: () => getAllUserReports(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
