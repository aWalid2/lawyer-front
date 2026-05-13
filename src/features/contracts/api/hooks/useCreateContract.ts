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
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة العقد");
    },
  });
};