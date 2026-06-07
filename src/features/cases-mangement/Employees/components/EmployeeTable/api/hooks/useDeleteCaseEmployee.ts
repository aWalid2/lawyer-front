import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCaseEmployee } from "../services/deleteCaseEmployee";

export const useDeleteCaseEmployee = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCaseEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-employees", caseId] });
      toast.success("تم حذف الموظف من القضية");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الموظف من القضية");
    },
  });
};