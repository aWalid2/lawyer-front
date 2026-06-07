import { useQuery } from "@tanstack/react-query";
import { getCasesCount } from "../services/getCasesCount";

export const useGetCasesCount = () => {

  const { data,isPending } = useQuery({
    queryKey: ["casesCount"],
    queryFn: getCasesCount,
  });

  return { data ,isPending};
};
