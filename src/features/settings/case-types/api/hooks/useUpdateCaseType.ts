import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCaseType } from "../services/updateCaseType";
import { toast } from "sonner";

export const useUpdateCaseType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCaseType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["case-types"] });
            toast.success("تم تحديث نوع القضية بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث نوع القضية");
        },
    });
};
