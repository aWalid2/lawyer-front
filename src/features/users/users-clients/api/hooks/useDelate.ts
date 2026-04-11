import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteClient } from "../servrce/delateClients";

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