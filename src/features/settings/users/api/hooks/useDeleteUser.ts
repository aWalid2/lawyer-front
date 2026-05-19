import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services/deleteUser";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (employeeId: number) => deleteUser(employeeId),
  });
};
