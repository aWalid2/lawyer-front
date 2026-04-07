import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCourt } from "../services/createCourt"
import { toast } from "sonner";

export const useCreateCourt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["courts"],
        mutationFn: createCourt,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courts"] });
            toast.success("تم إضافة المحكمة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في إضافة المحكمة");
        },
    })
}