import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createOtherSession } from "../services/createOtherSession";

export const useCreateOtherSession = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOtherSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["other-sessions", caseId] });
      toast.success("تم إضافة الجلسة الإدارية بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة الجلسة الإدارية");
    },
  });
};
