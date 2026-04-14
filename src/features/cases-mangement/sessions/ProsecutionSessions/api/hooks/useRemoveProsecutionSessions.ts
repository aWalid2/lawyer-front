import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeProsecutionSession } from "../services/removeProsecutionSession";

export const useRemoveProsecutionSessions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeProsecutionSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-sessions"] });
            toast.success("تم حذف الجلسة بنجاح", { position: "top-center" });
        },
        onError: () => {
            toast.error("حدث خطأ أثناء حذف الجلسة", { position: "top-center" });
        }
    });
};
