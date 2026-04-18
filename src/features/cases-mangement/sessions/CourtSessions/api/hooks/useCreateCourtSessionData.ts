import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCourtSessionData } from "../services/createCourtSessionData";

export const useCreateCourtSessionData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourtSessionData,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["court-session-data", variables.id, variables.level] });
      toast.success("تم الإضافة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإضافة");
    },
  });
};
