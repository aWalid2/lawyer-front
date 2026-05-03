import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteClientStatus } from "../services/deleteClientStatus";

export const useDeleteClientStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClientStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-statuses"] });
      toast.success("تم حذف صفة الموكل بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء حذف صفة الموكل");
    },
  });
};
