import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateLawyer } from "../service/updateLaweyrs";

export const useUpdateLawyer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["lawyers-update"],
        mutationFn: updateLawyer,
        retry: 1,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["lawyer-profile"] });
            toast.success(data.message || "تم تحديث بيانات المحامي بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث البيانات");
        },
    });
};
