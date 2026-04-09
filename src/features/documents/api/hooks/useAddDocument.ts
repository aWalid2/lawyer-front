// documents/api/hooks/useAddDocument.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addDocument } from "../service/addDocument";

interface AddDocumentParams {
    clientId: string;
    data: FormData;
}

export const useAddDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: AddDocumentParams) => addDocument(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            toast.success("تم إضافة المستند بنجاح");
        },
        onError: (error: any) => {
            console.error("Error details:", error);
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة المستند");
        },
    });
};