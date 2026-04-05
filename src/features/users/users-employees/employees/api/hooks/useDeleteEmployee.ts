// employees/api/hooks/useDeleteEmployee.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteEmployee } from "../service/deleteEmployee";
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteEmployee(id),
        onSuccess: () => {
            // تحديث قائمة الموظفين بعد الحذف
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success("تم حذف الموظف بنجاح");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف الموظف");
        },
    });
};