import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/getAllUsers";
import type { UserT } from "../../types/userT";

export const useGetAllUsers = () => {
  return useQuery<UserT[]>({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    });
}

