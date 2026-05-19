import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../services/addUser";
import type { AddUserRequest } from "../../types/addUserRequest";

export const useAddUser = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: AddUserRequest) => addUser(userData),
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    }
  });
};
