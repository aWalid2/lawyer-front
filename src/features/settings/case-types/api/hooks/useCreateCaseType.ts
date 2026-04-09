import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCaseType } from "../services/createCaseType";
import { toast } from "sonner";

export const useCreateCaseType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCaseType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["case-types"] });
            toast.success("تم إضافة نوع القضية بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في إضافة نوع القضية");
        },
    });
};
