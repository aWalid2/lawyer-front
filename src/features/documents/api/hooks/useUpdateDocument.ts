import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateDocument } from "../service/updateDocument";

interface UpdateDocumentParams {
    id: number;
    clientId: string;
    data: FormData;
}

export const useUpdateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateDocumentParams) => updateDocument(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            toast.success("تم تحديث المستند بنجاح");
        },
        onError: (error: any) => {
            console.error("Error details:", error);
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء تحديث المستند");
        },
    });
};