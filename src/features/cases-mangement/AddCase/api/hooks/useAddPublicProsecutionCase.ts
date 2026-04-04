import { useMutation } from "@tanstack/react-query";
import { addPublicProsecutionCase } from "../services/addPublicProsecutionCase";
import { mapToApiPayload, type FormValues } from "../../utils/mapToApiPayload";
import { toast } from "sonner";
import type { ProsecutionPayload } from "../../types/caseT";
import { useNavigate } from "react-router-dom";

export const useAddPublicProsecutionCase = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (values: FormValues) => {
            const payload = mapToApiPayload(values);
            return addPublicProsecutionCase(payload as ProsecutionPayload);
        },
        onSuccess: () => {
            toast.success("تم إضافة القضية بنجاح");
            navigate("/dashboard/case-management");
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "حدث خطأ";
            toast.error(message);
        },
    });
};