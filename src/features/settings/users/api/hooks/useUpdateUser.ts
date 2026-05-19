import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/updateUser";
import type { UpdateUserRequest } from "../../types/addUserRequest";

export const useUpdateUser = () => {
    
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ employeeId, userData }: { employeeId: number; userData: UpdateUserRequest }) =>
      updateUser(employeeId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    }
  });
  
};
