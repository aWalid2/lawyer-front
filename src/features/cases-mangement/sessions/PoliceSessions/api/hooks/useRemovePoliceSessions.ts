import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePoliceSession } from "../services/removePoliceSession";
import { toast } from "sonner";

export const useRemovePoliceSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removePoliceSession(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["police-sessions"] });
      toast.success("تم حذف الجلسة بنجاح");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل حذف الجلسة");
    },
  });
};