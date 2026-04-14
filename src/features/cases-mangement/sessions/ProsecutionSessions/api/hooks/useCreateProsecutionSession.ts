import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProsecutionSession } from "../services/createProsecutionSession";

export const useCreateProsecutionSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProsecutionSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-session-info"] });
            toast.success("تمت إضافة بيانات النيابة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة بيانات النيابة");
        }
    });
};