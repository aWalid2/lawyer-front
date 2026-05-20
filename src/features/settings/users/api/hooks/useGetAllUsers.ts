import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/getAllUsers";
import type { UserT } from "../../types/userT";

export const useGetAllUsers = (role_id?: string) => {
  return useQuery<UserT[]>({
    queryKey: ["allUsers", role_id],
    queryFn: () => getAllUsers(role_id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

