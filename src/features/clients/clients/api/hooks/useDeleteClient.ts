import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient } from "../services/deleteClient";
import { toast } from "sonner";

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteClient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || "حدث خطأ في حذف العميل")
        }
    });
};