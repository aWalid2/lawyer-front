import type { PaymentFormValues } from "@/features/cases-mangement/Payments/types";

export interface PaymentRequestBody {
  payment_type: string;
  employee_id: number;
  description: string;
  amount: number;
  payment_date: string;
  notes: string;
}

export type PaymentRequestPayload = FormData | PaymentRequestBody;

export const buildPaymentFormData = (values: PaymentFormValues) => {
  const employeeId = typeof values.employeeId === "number" ? values.employeeId : Number(values.employeeId);
  const amount = typeof values.amount === "number" ? values.amount : Number(values.amount);

  if (!(values.attachments instanceof FileList) || values.attachments.length === 0) {
    return {
      payment_type: values.paymentType,
      employee_id: employeeId,
      description: values.description,
      amount,
      payment_date: values.paymentDate,
      notes: values.notes || "",
    } as PaymentRequestBody;
  }

  const formData = new FormData();
  formData.append("payment_type", values.paymentType);
  formData.append("employee_id", String(employeeId));
  formData.append("description", values.description);
  formData.append("amount", String(amount));
  formData.append("payment_date", values.paymentDate);
  formData.append("notes", values.notes || "");

  if (values.attachments.length > 0) {
    formData.append("file", values.attachments[0]);
  }

  return formData;
};
