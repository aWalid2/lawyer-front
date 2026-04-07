// case-status/api/hooks/useUpdateCaseStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCaseStatus } from "../service/updateCaseStatus";

export const useUpdateCaseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      updateCaseStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caseStatuses"] });
      toast.success("تم تعديل الحالة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعديل الحالة");
    },
  });
};