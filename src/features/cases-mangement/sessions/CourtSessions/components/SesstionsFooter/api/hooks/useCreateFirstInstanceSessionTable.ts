import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFirstInstanceSessionTable } from "../services/createFirstInstanceSessionTable";
import { toast } from "sonner";

export const useCreateFirstInstanceSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ caseId, data }: { caseId: number; data: any }) => createFirstInstanceSessionTable(caseId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["first-instance", variables.caseId] });
            toast.success("تم اضافة الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
