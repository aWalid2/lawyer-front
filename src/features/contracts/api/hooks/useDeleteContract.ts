import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteContract } from "../services/deleteContract";

export const useDeleteContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("تم حذف العقد بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف العقد");
    },
  });
};