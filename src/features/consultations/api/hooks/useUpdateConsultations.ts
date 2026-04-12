import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateConsultation } from "../service/updateConsultations";
import type { Consultation } from "../../MainConsultations/types";

export const useUpdateConsultation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["consultations-update"],
        mutationFn: ({ id, data }: { id: string; data: Partial<Consultation> }) => 
            updateConsultation(id, data),
        retry: 1,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["consultations"] });
            queryClient.invalidateQueries({ queryKey: ["consultation-profile"] });
            toast.success(data?.message || "تم تحديث بيانات الاستشارة بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث البيانات");
        },
    });
};