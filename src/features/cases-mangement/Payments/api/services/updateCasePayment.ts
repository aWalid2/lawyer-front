import type { PaymentFormValues } from "@/features/cases-mangement/Payments/types";
import { buildPaymentFormData } from "./buildPaymentFormData";
import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";
import { toast } from "sonner";

interface UpdateCasePaymentPayload {
  paymentId: string | number;
  data: PaymentFormValues;
}

export const updateCasePayment = async ({ paymentId, data }: UpdateCasePaymentPayload) => {
  try {
    const formData = buildPaymentFormData(data);
    const response = await api.patch(`/payments/${paymentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message || "تم تحديث الدفعة بنجاح");
    return normalizeCasePayment(response.data.data || response.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "حدث خطأ أثناء تحديث الدفعة");
  }
};
