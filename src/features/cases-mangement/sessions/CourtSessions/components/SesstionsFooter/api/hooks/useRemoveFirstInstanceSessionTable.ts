import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeFirstInstanceSessionTable } from "../services/removeFirstInstanceSessionTable";

export const useRemoveFirstInstanceSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeFirstInstanceSessionTable,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["first-instance"] });
            toast.success("تم حذف الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء حذف الجلسة");
        },
    });
};