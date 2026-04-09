// documents/api/hooks/useDeleteDocument.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteDocument } from "../service/deleteDocument";

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            toast.success("تم حذف المستند بنجاح");
        },
        onError: (error: any) => {
            console.error("Error details:", error);
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المستند");
        },
    });
};