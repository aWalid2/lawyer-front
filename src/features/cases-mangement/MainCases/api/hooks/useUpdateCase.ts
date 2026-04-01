import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCase } from "../services/updateCase";
import { toast } from "sonner";

export const useUpdateCase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["cases"],
        mutationFn: updateCase,
        retry: 1,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cases"] });
            toast.success("تم تحديث القضية بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    });

};