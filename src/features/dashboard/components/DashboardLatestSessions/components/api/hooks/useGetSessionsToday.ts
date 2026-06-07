import {useQuery} from "@tanstack/react-query";
import {getSessionsToday} from "../services/getSessionsToday";

export const useGetSessionsToday = () => {
  return useQuery({
    queryKey: ["sessions-today"],
    queryFn: getSessionsToday,
    refetchOnWindowFocus: false,
  });
}