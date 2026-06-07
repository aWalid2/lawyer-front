import { useQuery } from "@tanstack/react-query";
import { getSessionsTomorrow } from "../services/getSessionsTomorrow";

export const useGetSessionsTomorrow = () => {
  return useQuery({
    queryKey: ["sessions-tomorrow"],
    queryFn: getSessionsTomorrow,
    refetchOnWindowFocus: false,
  });
}