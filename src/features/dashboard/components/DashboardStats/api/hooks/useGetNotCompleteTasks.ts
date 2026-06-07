import { useQuery } from "@tanstack/react-query";
import { getNotCompleteTasks } from "../services/getNotCompleteTasks";

export const useGetNotCompleteTasks = () => {

  const { data } = useQuery({
    queryKey: ["notCompleteTasks"],
    queryFn: getNotCompleteTasks,
  });

  return { data };
};
