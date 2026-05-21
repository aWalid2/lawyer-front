import { useQuery } from "@tanstack/react-query";
import { getCircles } from "@/features/settings/courts/api/services/getCircles";

export const useGetCircles = (court_id: number | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["circles", court_id],
    queryFn: () => court_id !== undefined ? getCircles(court_id) : Promise.resolve(undefined),
    enabled: enabled && court_id !== undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
