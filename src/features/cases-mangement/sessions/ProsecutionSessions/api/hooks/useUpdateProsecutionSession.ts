import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProsecutionSession } from "../services/updateProsecutionSession";

export const useUpdateProsecutionSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProsecutionSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-session-info"] });
            toast.success("تم التعديل بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء التعديل");
        }
    });
};