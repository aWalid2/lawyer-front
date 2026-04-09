import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCaseType } from "../services/deleteCaseType";
import { toast } from "sonner";

export const useDeleteCaseType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCaseType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["case-types"] });
            toast.success("تم حذف نوع القضية بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في حذف نوع القضية");
        },
    });
};
