import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createRelatedCase } from "../services/createRelatedCase";

interface CreateRelatedCaseValues {
  caseId: string;
  related_case_id: number;
}

export const useCreateRelatedCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ caseId, related_case_id }: CreateRelatedCaseValues) =>
      createRelatedCase(caseId, { related_case_id }),
    onSuccess: (_, variables) => {
      toast.success("تمت إضافة القضية المرتبطة بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["relatedCases", variables.caseId],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "حدث خطأ أثناء إضافة القضية المرتبطة";

      toast.error(message);
    },
  });
};