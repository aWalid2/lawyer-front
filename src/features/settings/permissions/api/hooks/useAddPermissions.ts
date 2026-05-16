import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPermissions } from "../services/addPermissions";
import type { AddPermissionsRequest, AddPermissionsResponse } from "@/features/settings/permissions/types";

export const useAddPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddPermissionsRequest): Promise<AddPermissionsResponse> => addPermissions(payload),
    onSuccess: () => {
      // Invalidate role queries to refresh permissions
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role-permissions"] });
    },
    onError: (error) => {
      console.error("Failed to add permissions:", error);
    },
  });
};
