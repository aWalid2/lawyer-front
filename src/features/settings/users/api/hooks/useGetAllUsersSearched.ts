import { useQuery } from "@tanstack/react-query";
import type { UserT } from "../../types/userT";
import { getAllUsersSearched } from "../services/getAllUsersSearched";

export const useGetAllUsersSearched = (searchTerm: string) => {
  return useQuery<UserT[]>({
    queryKey: ["allUsersSearched", searchTerm],
    queryFn: () => getAllUsersSearched(searchTerm),
    enabled: Boolean(searchTerm),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

