import type { PaymentFormValues } from "@/features/cases-mangement/Payments/types";

export interface PaymentRequestBody {
  payment_type: string;
  employee_id: number;
  payment_description: string;
  amount: number;
  payment_date: string;
  notes: string;
}

export type PaymentRequestPayload = PaymentRequestBody;

export const buildPaymentFormData = (values: PaymentFormValues): PaymentRequestBody => {
  const amount = typeof values.amount === "number" ? values.amount : Number(values.amount);

  return {
    payment_type: values.payment_type,
    employee_id: Number(values.employee_id),
    payment_description: values.payment_description,
    amount,
    payment_date: values.payment_date,
    notes: values.notes || "",
  };
};
