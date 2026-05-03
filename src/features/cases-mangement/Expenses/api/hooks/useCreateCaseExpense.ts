import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCaseExpense } from "../services/createCaseExpense";

export const useCreateCaseExpense = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCaseExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-expenses", caseId] });
      toast.success("تمت إضافة المصروف بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة المصروف");
    },
  });
};