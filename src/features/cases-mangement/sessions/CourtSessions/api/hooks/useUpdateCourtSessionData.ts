import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCourtSessionData } from "../services/updateCourtSessionData";

export const useUpdateCourtSessionData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCourtSessionData,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["court-session-data", variables.id, variables.level] });
      toast.success("تم التعديل بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء التعديل");
    },
  });
};
