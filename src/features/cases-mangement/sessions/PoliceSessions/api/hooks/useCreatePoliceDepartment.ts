import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPoliceDepartment } from "../services/createPoliceDepartment";

export const useCreatePoliceDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPoliceDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["police-department"] });
            toast.success("تمت إضافة بيانات المخفر بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة بيانات المخفر");
        }
    });
};
