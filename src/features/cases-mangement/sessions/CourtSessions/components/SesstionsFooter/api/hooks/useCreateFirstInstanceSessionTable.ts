import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFirstInstanceSessionTable } from "../services/createFirstInstanceSessionTable";
import { toast } from "sonner";

export const useCreateFirstInstanceSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFirstInstanceSessionTable,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["first-instance-session", variables.caseId] });
            toast.success("تم اضافة الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
