import { useQuery } from "@tanstack/react-query";
import { getRoleDetails } from "../services/getRoleDetails";

export const useGetRoleDetails = (roleId: number | undefined) => {
  return useQuery({
    queryKey: ["role-details", roleId],
    queryFn: () => getRoleDetails(roleId!),
    enabled: !!roleId,
  });
};
