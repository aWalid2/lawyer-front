import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClients } from "../service/addClient";
import { toast } from "sonner";

export const useAddClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => addClients(formData),
    onSuccess: (data) => {
      console.log("Success:", data);
      toast.success("تم إضافة الموكل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["client-profile"] });
    },
    onError: (error: any) => {
      console.error("Mutation Error:", error);
      console.error("Error details:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "فشل في إضافة الموكل يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });
};