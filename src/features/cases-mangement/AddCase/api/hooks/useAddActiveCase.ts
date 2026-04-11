import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addActiveCase } from "../services/addActiveCase";
import { mapToApiPayload, type FormValues } from "../../utils/mapToApiPayload";
import { toast } from "sonner";
import type { ActivePayload } from "../../types/caseT";
import { useNavigate } from "react-router-dom";

export const useAddActiveCase = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (values: FormValues) => {
            const payload = mapToApiPayload(values);
            return addActiveCase(payload as ActivePayload);
        },
        onSuccess: (data: any) => {
            toast.success("تم إضافة القضية بنجاح");
            queryClient.invalidateQueries({ queryKey: ["cases"] });
            const newCaseId = data?.data?.id || data?.id;
            if (newCaseId) {
                navigate(`/dashboard/case-management/${newCaseId}`);
            } else {
                navigate("/dashboard/case-management");
            }
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
