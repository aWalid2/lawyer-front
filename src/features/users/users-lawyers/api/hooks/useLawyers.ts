import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addLawyers } from "../service/addLawyers";

export const useAddLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => addLawyers(data), // تعديل هنا
    onSuccess: () => {
      toast.success("تم إضافة المحامي بنجاح");
      queryClient.invalidateQueries({ queryKey: ["lawyer-profile"]});
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "فشل في إضافة المحامي يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });
};