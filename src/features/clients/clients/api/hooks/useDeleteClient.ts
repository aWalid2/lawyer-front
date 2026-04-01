import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient } from "../services/deleteClient";
import { toast } from "sonner";

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  deleteClient,
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["client-profile"] });
            toast.success("تم حذف الموكل بنجاح")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || "حدث خطأ في حذف الموكل")
        }
    
    });
};