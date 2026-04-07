// prosecution/api/hooks/useDeleteProsecution.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProsecution } from "../service/deleteProsecution";

export const useDeleteProsecution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProsecution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prosecutions"] });
      toast.success("تم حذف النيابة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف النيابة");
    },
  });
};