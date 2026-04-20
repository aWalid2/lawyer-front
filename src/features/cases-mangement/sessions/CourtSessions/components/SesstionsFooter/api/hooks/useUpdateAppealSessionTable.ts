import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAppealSessionTable } from "../services/updateAppealSessionTable";

export const useUpdateAppealSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ sessionId, data }: { sessionId: string | number; data: any }) => updateAppealSessionTable(Number(sessionId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appeal-session"] });
            toast.success("تم تحديث الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تحديث الجلسة");
        },
    });
};