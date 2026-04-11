import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateClient } from "../servrce/updateClients";

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["clients"],
        mutationFn:  updateClient,
        retry: 1,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["client-profile"] });
            queryClient.invalidateQueries({ queryKey: ["client"] });
            queryClient.invalidateQueries({ queryKey: ["client-cases"] });
            toast.success(data.message || "تم تحديث بيانات الموكل بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث البيانات");
        },
    });
};
