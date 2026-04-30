import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCaseDocument } from "../service/updateCaseDocument";

export const useUpdateCaseDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: FormData }) => updateCaseDocument(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-documents"] });
      toast.success("تم تعديل المستند بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعديل المستند");
    },
  });
};