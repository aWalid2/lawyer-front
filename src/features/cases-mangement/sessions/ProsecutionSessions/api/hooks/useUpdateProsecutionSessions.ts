import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProsecutionSessions } from "../services/updateProsecutionSessions";

export const useUpdateProsecutionSessions = ({ caseId }: { caseId: number }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => updateProsecutionSessions({ caseId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-sessions"] });
            toast.success("تم تعديل الجلسة بنجاح", { position: "top-center" });
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تعديل الجلسة", { position: "top-center" });
        }
    });
};
