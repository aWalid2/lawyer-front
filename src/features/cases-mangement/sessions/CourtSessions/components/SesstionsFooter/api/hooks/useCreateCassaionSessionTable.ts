import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCassaionSessionTable } from "../services/createCassaionSessionTable";

export const useCreateCassaionSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ caseId, data }: { caseId: string | number; data: any }) => createCassaionSessionTable(caseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cassaion-session"] });
            toast.success("تم إضافة الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة الجلسة");
        },
    });
};