import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteConsultation } from "../service/delateConsultations";

export const useDeleteConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteConsultation(id),
    onSuccess: () => {
      toast.success("تم حذف الاستشارة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["consultations"]});
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "فشل في حذف الاستشارة يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });
};