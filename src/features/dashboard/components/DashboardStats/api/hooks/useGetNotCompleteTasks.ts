import { useQuery } from "@tanstack/react-query";
import { getNotCompleteTasks } from "../services/getNotCompleteTasks";

export const useGetNotCompleteTasks = () => {

  const { data ,isPending} = useQuery({
    queryKey: ["notCompleteTasks"],
    queryFn: getNotCompleteTasks,
  });

  return { data ,isPending};
};
