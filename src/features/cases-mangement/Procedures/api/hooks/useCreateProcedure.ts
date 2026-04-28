import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProcedure } from "../services/createProcedure";

export const useCreateProcedure = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures", caseId] });
      queryClient.invalidateQueries({ queryKey: ["procedure-last", caseId] });
      toast.success("تم إضافة الإجراء بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة الإجراء");
    },
  });
};