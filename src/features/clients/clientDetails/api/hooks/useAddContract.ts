import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContract } from "../services/addContract";
import { toast } from "sonner";

export const useAddContract = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["add-contract"],
        mutationFn: addContract,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["client-profile"] });
            queryClient.invalidateQueries({ queryKey: ["client"] });
            toast.success(data.message || "تم إضافة العقد بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في إضافة العقد");
        },
    });
};
