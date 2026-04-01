import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../services/updateClient";
import { toast } from "sonner";

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateClient(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["client-profile"] });
            toast.success("تم تحديث بيانات الموكل بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث البيانات");
        },
    });
};
