import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateContract } from "../services/updateContract";

export const useUpdateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("تم تعديل العقد بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل العقد");
    },
  });
};