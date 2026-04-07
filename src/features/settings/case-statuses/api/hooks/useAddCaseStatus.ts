// case-status/api/hooks/useAddCaseStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCaseStatus } from "../service/addCaseStatus";

export const useAddCaseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => addCaseStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caseStatuses"] });
      toast.success("تم إضافة الحالة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة الحالة");
    },
  });
};