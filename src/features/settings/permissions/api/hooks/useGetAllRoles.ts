import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../services/getAllRoles";
import type { RoleResponse } from "../../types";

export const useGetAllRoles = (enabled: boolean = true) => {
  return useQuery<RoleResponse[], Error>({
    queryKey: ["roles"],
    queryFn: getAllRoles,
    enabled,
  });
};
