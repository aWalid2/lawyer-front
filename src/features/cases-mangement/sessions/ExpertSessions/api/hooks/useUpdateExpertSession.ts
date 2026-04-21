import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateExpertSession } from "../services/updateExpertSession";

export const useUpdateExpertSession = (caseId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExpertSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-sessions", caseId],
      });
      toast.success("تم تعديل تقرير الخبير بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل تقرير الخبير");
    },
  });
};
