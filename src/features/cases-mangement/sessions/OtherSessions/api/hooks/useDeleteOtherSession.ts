import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteOtherSession } from "../services/deleteOtherSession";

export const useDeleteOtherSession = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOtherSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["other-sessions", caseId] });
      queryClient.invalidateQueries({ queryKey: ["other-session-last", caseId] });
      toast.success("تم حذف الجلسة الإدارية بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الجلسة الإدارية");
    },
  });
};
