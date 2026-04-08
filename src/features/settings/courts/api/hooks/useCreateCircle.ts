import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCircle } from "../services/createCircle"
import { toast } from "sonner";

export const useCreateCircle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["circles"],
        mutationFn: ({ name, court_id }: { court_id: number, name: string }) => createCircle(court_id, { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["circles"] });
            queryClient.invalidateQueries({ queryKey: ["courts"] });
            toast.success("تم إضافة الدائرة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ في إضافة الدائرة");
        },
    })
}
