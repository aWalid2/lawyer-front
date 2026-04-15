import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProsecutionSessions } from "../services/createProsecutionSessions";

export const useCreateProsecutionSessions = ({ caseId }: { caseId: number }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => createProsecutionSessions({ caseId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-sessions"] });
            toast.success("تمت إضافة الجلسة بنجاح", { position: "top-center" });
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة الجلسة", { position: "top-center" });
        }
    });
};
