import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCase } from "../services/updateCase";
import { toast } from "sonner";

export const useUpdateCase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["cases"],
        mutationFn: updateCase,
        retry: 1,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["cases"] });
            toast.success(data.message || "تم تحديث القضية بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث القضية");
        }

    });

};