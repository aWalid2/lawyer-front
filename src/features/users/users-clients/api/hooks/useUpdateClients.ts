import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { updateClient } from "../servrce/updateClients";

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["clients"],
        mutationFn: updateClient,
        retry: 1,
        onSuccess: (data: { message?: string }) => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            queryClient.invalidateQueries({ queryKey: ["client-profile"] });
            queryClient.invalidateQueries({ queryKey: ["client"] });
            queryClient.invalidateQueries({ queryKey: ["client-cases"] });
            toast.success(data.message || "تم تحديث بيانات الموكل بنجاح");
        },
        onError: (error: unknown) => {
            if (isAxiosError<{ message?: string }>(error)) {
                toast.error(error.response?.data?.message || "حدث خطأ في تحديث البيانات");
                return;
            }

            toast.error("حدث خطأ في تحديث البيانات");
        },
    });
};
