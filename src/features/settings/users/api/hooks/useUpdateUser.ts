import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/updateUser";
import type { UpdateUserRequest } from "../../types/addUserRequest";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ employeeId, userData }: { employeeId: number; userData: UpdateUserRequest }) =>
      updateUser(employeeId, userData),
  });
};
