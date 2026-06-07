import { useQuery } from "@tanstack/react-query";
import { getUpcomingTasks } from "../services/getUpcomingTasks";

export const useGetUpcomingTasks = () => {
  return useQuery({
    queryKey: ["upcoming-tasks"],
    queryFn: getUpcomingTasks,
    refetchOnWindowFocus: false,
  });
};
