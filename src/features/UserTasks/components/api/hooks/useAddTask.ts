import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskUser } from "../service/addTask";
import { toast } from "sonner";

export const useTaskUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientData: any) => taskUser(clientData),
    onSuccess: () => {
      toast.success("تم إضافة المهمة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("فشل في إضافة المهمة يرجى المحاولة لاحقاً");
    },
  });
};