import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteExpertSession } from "../services/deleteExpertSession";

export const useDeleteExpertSession = (caseId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpertSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-sessions", caseId],
      });
      toast.success("تم حذف تقرير الخبير بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف تقرير الخبير");
    },
  });
};
