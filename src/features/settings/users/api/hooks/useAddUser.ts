import { useMutation } from "@tanstack/react-query";
import { addUser } from "../services/addUser";
import type { AddUserRequest } from "../../types/addUserRequest";

export const useAddUser = () => {
  return useMutation({
    mutationFn: (userData: AddUserRequest) => addUser(userData),
  });
};
