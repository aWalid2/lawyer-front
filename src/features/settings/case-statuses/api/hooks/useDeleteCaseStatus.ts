// case-status/api/hooks/useDeleteCaseStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCaseStatus } from "../service/deleteCaseStatus";

export const useDeleteCaseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCaseStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caseStatuses"] });
      toast.success("تم حذف الحالة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف الحالة");
    },
  });
};