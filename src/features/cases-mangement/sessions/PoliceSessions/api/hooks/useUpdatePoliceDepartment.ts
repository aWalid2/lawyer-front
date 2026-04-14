import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePoliceDepartment } from "../services/updatePoliceDepartment";

export const useUpdatePoliceDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePoliceDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["police-department"] });
            toast.success("تم التعديل بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء التعديل");
        }
    });
};
