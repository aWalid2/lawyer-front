import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTask } from "../service/delateTask";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteTask,
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["tasks-with-case"] });
            toast.success("تم حذف المهمة بنجاح")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || "حدث خطأ في حذف المهمة")
        }
    
    });
};