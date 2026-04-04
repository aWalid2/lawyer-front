import { useMutation } from "@tanstack/react-query";
import { addUnderAppealCase } from "../services/addUnderAppealCase";
import { mapToApiPayload, type FormValues } from "../../utils/mapToApiPayload";
import { toast } from "sonner";
import type { UnderAppealPayload } from "../../types/caseT";
import { useNavigate } from "react-router-dom";

export const useAddUnderAppealCase = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: FormValues) => {
      const payload = mapToApiPayload(values);
      return addUnderAppealCase(payload as UnderAppealPayload);
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