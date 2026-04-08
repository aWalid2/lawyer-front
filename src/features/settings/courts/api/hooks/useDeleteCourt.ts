import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCourt } from "../services/deleteCourt"
import { toast } from "sonner";

export const useDeleteCourt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["courts"],
        mutationFn: ({ id }: { id: number }) => deleteCourt(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courts"] });
            toast.success("تم حذف المحكمة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في حذف المحكمة");
        },
    })
}