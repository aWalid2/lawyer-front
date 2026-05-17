import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "../services/updateRole";
import type { UpdateRoleRequest, UpdateRoleResponse } from "../../types";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateRoleResponse,
    Error,
    { id: string | number; data: UpdateRoleRequest }
  >({
    mutationFn: ({ id, data }) => updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
