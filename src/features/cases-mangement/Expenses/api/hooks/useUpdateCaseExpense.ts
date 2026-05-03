import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCaseExpense } from "../services/updateCaseExpense";

export const useUpdateCaseExpense = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCaseExpense,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["case-expenses", caseId] });
      queryClient.invalidateQueries({
        queryKey: ["case-expense", String(variables.expenseId)],
      });
      toast.success("تم تعديل المصروف بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل المصروف");
    },
  });
};