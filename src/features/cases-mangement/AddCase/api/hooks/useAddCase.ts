import { useMutation } from "@tanstack/react-query";
import { addCase } from "../services/addCase";
import { mapToApiPayload, type FormValues } from "../../types/typseCase";
import { toast } from "sonner";

export const useAddCase = () => {
    return useMutation({
        mutationFn: (data: FormValues) => addCase(mapToApiPayload(data)),
        onSuccess: () => {
            toast.success("تم إضافة القضية بنجاح");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};