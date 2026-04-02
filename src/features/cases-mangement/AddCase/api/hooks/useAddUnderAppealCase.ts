import { useMutation } from "@tanstack/react-query";
import { addUnderAppealCase } from "../services/addUnderAppealCase";
import { mapToApiPayload, type FormValues } from "../../utils/mapToApiPayload";
import { toast } from "sonner";
import type { UnderAppealPayload } from "../../types/caseT";

export const useAddUnderAppealCase = () => {
  return useMutation({
    mutationFn: (values: FormValues) => {
      const payload = mapToApiPayload(values);
      return addUnderAppealCase(payload as UnderAppealPayload);
    },

    onSuccess: () => {
      toast.success("تم إضافة القضية بنجاح");
    },

    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ");
    },
  });
};