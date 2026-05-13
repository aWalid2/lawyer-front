import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCaseExpense } from "../services/deleteCaseExpense";

export const useDeleteCaseExpense = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCaseExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-expenses", caseId] });
      queryClient.invalidateQueries({ queryKey: ["case-expenses-summary", caseId] });
      queryClient.invalidateQueries({ queryKey: ["reports-all-case-expenses"] });
      toast.success("تم حذف المصروف بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف المصروف");
    },
  });
};