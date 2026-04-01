import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../services/updateClient";
import { toast } from "sonner";

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["clients"],
        mutationFn: updateClient,
        retry: 1,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["client-profile"] });
            toast.success(data.message || "تم تحديث بيانات الموكل بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث البيانات");
        },
    });
};
