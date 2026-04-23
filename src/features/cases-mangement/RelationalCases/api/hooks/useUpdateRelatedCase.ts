import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateRelatedCase } from "../services/updateRelatedCase";

interface UpdateRelatedCaseValues {
  caseId: string;
  relatedCaseId: number;
  related_case_id: number;
}

export const useUpdateRelatedCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ caseId, relatedCaseId, related_case_id }: UpdateRelatedCaseValues) =>
      updateRelatedCase(caseId, relatedCaseId, { related_case_id }),
    onSuccess: (_, variables) => {
      toast.success("تم تعديل القضية المرتبطة بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["relatedCases", variables.caseId],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "حدث خطأ أثناء تعديل القضية المرتبطة";

      toast.error(message);
    },
  });
};