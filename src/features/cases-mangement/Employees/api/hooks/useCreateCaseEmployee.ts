import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCaseEmployee } from "../services/createCaseEmployee";

export const useCreateCaseEmployee = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCaseEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-employees", caseId] });
      toast.success("تم تعيين الموظف بنجاح");
    },
    onError: (err) => {
      toast.error((err as any).response?.data.message || "حدث خطأ أثناء تعيين الموظف");
    },
  });
};