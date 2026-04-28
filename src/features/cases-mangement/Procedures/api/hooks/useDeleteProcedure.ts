import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProcedure } from "../services/deleteProcedure";

export const useDeleteProcedure = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures", caseId] });
      queryClient.invalidateQueries({ queryKey: ["procedure-last", caseId] });
      toast.success("تم حذف الإجراء بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الإجراء");
    },
  });
};