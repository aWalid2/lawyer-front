import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateClientStatus } from "../services/updateClientStatus";

export const useUpdateClientStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      updateClientStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-statuses"] });
      toast.success("تم تعديل صفة الموكل بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء تعديل صفة الموكل");
    },
  });
};
