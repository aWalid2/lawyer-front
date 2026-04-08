import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCircle } from "../services/updateCircle"
import { toast } from "sonner";

export const useUpdateCircle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["circles"],
        mutationFn: ({ id, data }: { id: number, data: { name: string } }) => updateCircle(String(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["circles"] });
            toast.success("تم تعديل الدائرة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في تعديل الدائرة");
        },
    })
}
