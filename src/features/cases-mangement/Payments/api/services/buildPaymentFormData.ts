import type { PaymentFormValues } from "@/features/cases-mangement/Payments/types";

export const buildPaymentFormData = (values: PaymentFormValues): FormData => {
  const formData = new FormData();

  formData.append("payment_type", values.payment_type);
  formData.append("employee_id", String(values.employee_id || ""));
  formData.append("payment_description", values.payment_description);
  formData.append("amount", String(values.amount || ""));
  formData.append("payment_date", values.payment_date);
  formData.append("notes", values.notes || "");

  if (values.attachment instanceof File) {
    formData.append("attachment", values.attachment);
  }

  return formData;
};
