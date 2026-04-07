import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCourt } from "../services/updateCourt"
import { toast } from "sonner";

export const useUpdateCourt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["courts"],
        mutationFn: ({ id, data }: { id: number, data: { name: string, address: string } }) => updateCourt(String(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courts"] });
            toast.success("تم تعديل المحكمة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في تعديل المحكمة");
        },
    })
}