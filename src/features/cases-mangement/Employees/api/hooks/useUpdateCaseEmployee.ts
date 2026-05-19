import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCaseEmployee } from "../services/updateCaseEmployee";

export const useUpdateCaseEmployee = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCaseEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-employees", caseId] });
      toast.success("تم تعديل الموظف بنجاح");
    },
    onError: (err) => {
      toast.error((err as any).response?.data.message || "حدث خطأ أثناء تعديل الموظف");
    },
  });
};