import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCaseRole } from "../services/deleteCaseRole";

export const useDeleteCaseRole = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCaseRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-roles", caseId] });
      toast.success("تم حذف الدور من القضية بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الدور من القضية");
    },
  });
};
