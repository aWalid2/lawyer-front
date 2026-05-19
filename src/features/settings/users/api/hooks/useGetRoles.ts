import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../services/getRoles";
import type { RoleT } from "../../types/addUserRequest";

export const useGetRoles = () => {
  return useQuery<RoleT[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
