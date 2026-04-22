import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
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
      queryClient.invalidateQueries({
        queryKey: ["expert-session-last", caseId],
      });
      toast.success("تم تعديل تقرير الخبير بنجاح");
    },
    onError: (error) => {
      const message =
        (error as AxiosError<{ message?: string; error?: string }>).response
          ?.data?.message ||
        (error as AxiosError<{ message?: string; error?: string }>).response
          ?.data?.error ||
        "حدث خطأ أثناء تعديل تقرير الخبير";

      toast.error(message);
    },
  });
};
