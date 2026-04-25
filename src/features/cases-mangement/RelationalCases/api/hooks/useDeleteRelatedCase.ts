import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteRelatedCase } from "../services/deleteRelatedCase";

interface ApiErrorShape {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
}

export const useDeleteRelatedCase = (caseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (relatedCaseId: string) => deleteRelatedCase(relatedCaseId),
    onSuccess: () => {
      toast.success("تم حذف القضية المرتبطة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["relatedCases", caseId] });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiErrorShape;
      const message =
        apiError.response?.data?.message ||
        apiError.response?.data?.error ||
        "حدث خطأ أثناء حذف القضية المرتبطة";

      toast.error(message);
    },
  });
};