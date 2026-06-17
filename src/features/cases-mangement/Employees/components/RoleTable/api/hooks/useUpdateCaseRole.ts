import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCaseRole } from "../services/updateCaseRole";

export const useUpdateCaseRole = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCaseRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-roles", caseId] });
      toast.success("تم تعديل الدور بنجاح");
    },
    onError: (err) => {
      toast.error((err as any).response?.data?.message || "حدث خطأ أثناء تعديل الدور");
    },
  });
};
