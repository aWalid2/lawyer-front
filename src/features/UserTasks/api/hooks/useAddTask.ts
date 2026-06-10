import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { taskUser } from "../service/addTask";

export const useTaskUser = (context?: "tasks" | "procedures") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientData: any) => taskUser(clientData),
    onSuccess: () => {
      toast.success("تم إضافة المهمة بنجاح");
      if (context === "procedures") {
        queryClient.invalidateQueries({ queryKey: ["tasks-with-case"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
    onError: () => {
      toast.error("فشل في إضافة المهمة يرجى المحاولة لاحقاً");
    },
  });
};