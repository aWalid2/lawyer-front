import { useMutation } from "@tanstack/react-query";
import { addPublicProsecutionOfficeCase } from "../services/addPublicProsecutionOfficeCase";
import { toast } from "sonner";
import type { ProsecutionPayload } from "../../types/caseT";
import { mapToApiPayload, type FormValues } from "../../utils/mapToApiPayload";
import { useNavigate } from "react-router-dom";

export const useAddPublicProsecutionOfficeCase = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (values: FormValues) => {
            const payload = mapToApiPayload(values);
            return addPublicProsecutionOfficeCase(payload as ProsecutionPayload);
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