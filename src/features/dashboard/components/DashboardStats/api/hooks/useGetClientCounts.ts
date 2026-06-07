import { useQuery } from "@tanstack/react-query";
import { getClientCounts } from "../services/getClientCount";

export const useGetClientCounts = () => {

  const { data,isPending } = useQuery({
    queryKey: ["clientCounts"],
    queryFn: getClientCounts,
  });

  return { data,isPending };
};
