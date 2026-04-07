// prosecution/api/hooks/useUpdateProsecution.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProsecution } from "../service/updateProsecution";

export const useUpdateProsecution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      updateProsecution(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prosecutions"] });
      toast.success("تم تعديل النيابة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعديل النيابة");
    },
  });
};