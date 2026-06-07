import { useQuery } from "@tanstack/react-query";
import { getSessionsAfterTomorrow } from "../services/getSessionsAfterTomorrow";

export const useGetSessionsAfterTomorrow = () => {
  return useQuery({
    queryKey: ["sessions-day-after-tomorrow"],
    queryFn: getSessionsAfterTomorrow,
    refetchOnWindowFocus: false,
  });
}