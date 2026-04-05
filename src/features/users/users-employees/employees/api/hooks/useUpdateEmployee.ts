// employees/api/hooks/useUpdateEmployee.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../service/updateEmployee";
import { toast } from "sonner";

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            updateEmployee(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success("تم تحديث بيانات الموظف بنجاح");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء تحديث بيانات الموظف");
        },
    });
};