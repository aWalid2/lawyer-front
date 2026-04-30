import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCaseDocument } from "../service/createCaseDocument";

export const useCreateCaseDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createCaseDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-documents"] });
      toast.success("تم إضافة المستند بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة المستند");
    },
  });
};