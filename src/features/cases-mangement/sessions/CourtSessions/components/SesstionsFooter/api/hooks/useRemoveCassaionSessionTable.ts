import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeCassaionSessionTable } from "../services/removeCassaionSessionTable";

export const useRemoveCassaionSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeCassaionSessionTable,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cassaion-session"] });
            toast.success("تم حذف الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء حذف الجلسة");
        },
    });
};