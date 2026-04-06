import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClients } from "../service/addClient";
import { toast } from "sonner";

export const useAddClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => addClients(formData),
    onSuccess: () => {
      toast.success("تم إضافة الموكل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["client-profile"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "فشل في إضافة الموكل يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });
};