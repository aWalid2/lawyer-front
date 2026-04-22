import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOtherSession } from "../services/updateOtherSession";

export const useUpdateOtherSession = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOtherSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["other-sessions", caseId] });
      queryClient.invalidateQueries({ queryKey: ["other-session-last", caseId] });
      toast.success("تم تعديل الجلسة الإدارية بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل الجلسة الإدارية");
    },
  });
};
