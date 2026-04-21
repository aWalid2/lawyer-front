import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExpertSession } from "../services/createExpertSession";

export const useCreateExpertSession = (caseId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpertSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-sessions", caseId],
      });
      toast.success("تم إضافة تقرير الخبير بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة تقرير الخبير");
    },
  });
};
