import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../services/createRole";
import type { CreateRoleRequest, CreateRoleResponse } from "@/features/settings/permissions/types";

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoleRequest): Promise<CreateRoleResponse> => createRole(payload),
    onSuccess: () => {
      // Invalidate role queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error) => {
      console.error("Failed to create role:", error);
    },
  });
};
