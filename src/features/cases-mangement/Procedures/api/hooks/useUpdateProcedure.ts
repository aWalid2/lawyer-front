import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProcedure } from "../services/updateProcedure";

export const useUpdateProcedure = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures", caseId] });
      queryClient.invalidateQueries({ queryKey: ["procedure-last", caseId] });
      toast.success("تم تعديل الإجراء بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل الإجراء");
    },
  });
};