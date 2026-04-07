import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCircle } from "../services/deleteCircle"
import { toast } from "sonner";

export const useDeleteCircle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["circles"],
        mutationFn: ({ id }: { id: number }) => deleteCircle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["circles"] });
            toast.success("تم حذف الدائرة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في حذف الدائرة");
        },
    })
}
