import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteLawyer } from "../service/deleteLawyers";

export const useDeleteLawyer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  deleteLawyer,
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lawyer-profile"] });
            toast.success("تم حذف المحامي بنجاح")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || "حدث خطأ في حذف المحامي")
        }
    
    });
};