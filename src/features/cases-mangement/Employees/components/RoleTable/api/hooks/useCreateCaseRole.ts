import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCaseRole } from "../services/createCaseRole";

export const useCreateCaseRole = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCaseRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-roles", caseId] });
      toast.success("تم تعيين الدور بنجاح");
    },
    onError: (err) => {
      toast.error((err as any).response?.data?.message || "حدث خطأ أثناء تعيين الدور");
    },
  });
};
