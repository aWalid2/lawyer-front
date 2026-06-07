import { useQuery } from "@tanstack/react-query";
import { getNotCompleteProcedures } from "../services/getNotCompleteProcedures";

export const useGetNotCompleteProcedures = () => {

  const { data,isPending } = useQuery({
    queryKey: ["notCompleteProcedures"],
    queryFn: getNotCompleteProcedures,
  });

  return { data,isPending };
};
