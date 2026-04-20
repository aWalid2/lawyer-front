import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppealSessionTable } from "../services/createAppealSessionTable";
import { toast } from "sonner";

export const useCreateAppealSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ caseId, data }: { caseId: number; data: any }) => createAppealSessionTable(caseId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["appeal-session", variables.caseId] });
            toast.success("تم اضافة الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
