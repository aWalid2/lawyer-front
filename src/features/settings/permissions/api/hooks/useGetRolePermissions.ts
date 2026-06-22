import { useQuery } from "@tanstack/react-query";
import { getRolePermissions } from "../services/getRolePermissions";
import type { RolePermission } from "../../types";

export const useGetRolePermissions = (roleId: number | undefined) => {
  return useQuery<RolePermission, Error>({
    queryKey: ["role-permissions", roleId],
    queryFn: () => getRolePermissions(roleId!),
    enabled: !!roleId,
  });
};
