import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeAppealSessionTable } from "../services/removeAppealSessionTable";

export const useRemoveAppealSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeAppealSessionTable,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appeal-session"] });
            toast.success("تم حذف الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء حذف الجلسة");
        },
    });
};