import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProsecutionSessions } from "../services/createProsecutionSessions";

export const useCreateProsecutionSessions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProsecutionSessions,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-sessions"] });
            toast.success("تمت إضافة الجلسة بنجاح", { position: "top-center" });
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة الجلسة", { position: "top-center" });
        }
    });
};
