import { useMutation } from "@tanstack/react-query";
import { addPublicProsecutionOfficCase } from "../services/addPublicProsecutionOfficCase";
import { toast } from "sonner";
import type { ProsecutionPayload } from "../../types/caseT";

export const useAddPublicProsecutionOfficeCase = () => {
    return useMutation({
        mutationFn: (payload: ProsecutionPayload) => addPublicProsecutionOfficCase(payload),
        onSuccess: () => {
            toast.success("تم إضافة القضية بنجاح");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};