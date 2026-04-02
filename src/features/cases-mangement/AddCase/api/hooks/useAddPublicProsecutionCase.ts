import { useMutation } from "@tanstack/react-query";
import { addPublicProsecutionCase } from "../services/addPublicProsecutionCase";
import { mapToApiPayload, type FormValues } from "../../utils/mapToApiPayload";
import { toast } from "sonner";

export const useAddPublicProsecutionCase = () => {
    return useMutation({
        mutationFn: (data: FormValues) => addPublicProsecutionCase(mapToApiPayload(data)),
        onSuccess: () => {
            toast.success("تم إضافة القضية بنجاح");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};