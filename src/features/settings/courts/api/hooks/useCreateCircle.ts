import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCircle } from "../services/createCircle"
import { toast } from "sonner";

export const useCreateCircle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["circles"],
        mutationFn: (data: { name: string; court_id: number }) => createCircle(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["circles"] });
            toast.success("تم إضافة الدائرة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في إضافة الدائرة");
        },
    })
}
