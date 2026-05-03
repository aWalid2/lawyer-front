import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClientStatus } from "../services/createClientStatus";

export const useCreateClientStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClientStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-statuses"] });
      toast.success("تم إضافة صفة الموكل بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء إضافة صفة الموكل");
    },
  });
};
