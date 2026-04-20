import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateFirstInstanceSessionTable } from "../services/updateFirstInstanceSessionTable";

export const useUpdateFirstInstanceSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ sessionId, data }: { sessionId: string | number; data: any }) => updateFirstInstanceSessionTable(Number(sessionId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["first-instance"] });
            toast.success("تم تحديث الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تحديث الجلسة");
        },
    });
};