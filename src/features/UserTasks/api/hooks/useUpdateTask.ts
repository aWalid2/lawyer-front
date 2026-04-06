// tasks/api/hooks/useUpdateTask.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../service/updateTask";
import { toast } from "sonner";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("تم تحديث المهمة بنجاح");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء تحديث المهمة");
        },
    });
};