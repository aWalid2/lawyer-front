import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProsecution } from "../service/addProsecution";

export const useAddProsecution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => addProsecution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prosecutions"] });
      queryClient.invalidateQueries({ queryKey: ["public-prosecutions-names"] });
      toast.success("تم إضافة النيابة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة النيابة");
    },
  });
};