import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addEmployee } from "../service/addEmployee";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => addEmployee(data),
    onSuccess: () => {
      toast.success("تم إضافة الموظف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["employee-profile"]});
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "فشل في إضافة الموظف يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });
};