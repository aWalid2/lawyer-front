import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCassaionSessionTable } from "../services/updateCassaionSessionTable";

export const useUpdateCassaionSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ sessionId, data }: { sessionId: string | number; data: any }) => updateCassaionSessionTable(sessionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cassaion-session"] });
            toast.success("تم تحديث الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تحديث الجلسة");
        },
    });
};