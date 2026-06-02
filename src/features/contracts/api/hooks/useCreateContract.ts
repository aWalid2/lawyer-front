import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createContract } from "../services/createContract";

export const useCreateContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("تمت إضافة العقد بنجاح");
    },
    onError: (err:any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء إضافة العقد");
    },
  });
};