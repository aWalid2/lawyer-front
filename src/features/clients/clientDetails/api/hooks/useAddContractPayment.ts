import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContractPayment } from "../services/addContractPayment";
import { toast } from "sonner";

export const useAddContractPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-contract-payment"],
    mutationFn: addContractPayment,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["client-profile"] });
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success(data?.message || "تم إضافة الدفعة بنجاح");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء إضافة الدفعة",
      );
    },
  });
};
