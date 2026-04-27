import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCaseDocument } from "../service/deleteCaseDocument";

export const useDeleteCaseDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCaseDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-documents"] });
      toast.success("تم حذف المستند بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المستند");
    },
  });
};