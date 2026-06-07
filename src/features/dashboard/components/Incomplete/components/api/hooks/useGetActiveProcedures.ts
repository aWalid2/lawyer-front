import { useQuery } from "@tanstack/react-query";
import { getActiveProcedures } from "../services/getActiveProcedures";

export const useGetActiveProcedures = () => {
  return useQuery({
    queryKey: ["active-procedures"],
    queryFn: getActiveProcedures,
    refetchOnWindowFocus: false,
  });
};
