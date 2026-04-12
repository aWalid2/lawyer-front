import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addConsultation } from "../service/addConsultations";

export const useAddConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => addConsultation(data),
    onSuccess: () => {
      toast.success("تم إضافة الاستشارة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["consultations"]});
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "فشل في إضافة الاستشارة يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });
};