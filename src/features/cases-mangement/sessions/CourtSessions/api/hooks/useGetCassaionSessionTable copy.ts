import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCassaionSessionTable } from "../services/getCassaionSessionTable";
import { toast } from "sonner";

export const useGetCassaionSessionTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ caseId }: { caseId: string | number }) => getCassaionSessionTable(caseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cassaion-session"] });
            toast.success("تم جلب الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء جلب الجلسة");
        },
    });
};