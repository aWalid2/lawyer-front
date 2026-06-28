import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export interface PaymentItem {
  id: string;
  payment_type: string;
  employee_id: number | "";
  employee_name: string;
  payment_description: string;
  amount: number;
  payment_date: string;
  notes: string;
  attachments: string[];
  rowNumber?: number;
  caseId?: number;
  createdAt?: string;
  updatedAt?: string;

}

export interface PaymentFormValues {
  payment_type: string;
  employee_id?: number | "";
  // employee_name: string;
  payment_description: string;
  amount: number | "";
  payment_date: string;
  notes: string;
  attachment?: File | string | null;
}

export interface PaymentSummary {
  totalAmount: number;
  latestPaymentDate: string | null;
}

export const EMPTY_PAYMENT_FORM_VALUES: PaymentFormValues = {
  payment_type: "",
  employee_id: "",
  // employee_name: "",
  payment_description: "",
  amount: "",
  payment_date: formatDateToYYYYMMDD(new Date().toISOString()) || "",
  notes: "",
  attachment: null,
};

export const toPaymentFormValues = (payment?: PaymentItem | null): PaymentFormValues => ({
  payment_type: payment?.payment_type ?? "",
  employee_id: payment?.employee_id ?? "",
  // employee_name: payment?.employee_name ?? "",
  payment_description: payment?.payment_description ?? "",
  amount: payment?.amount ?? "",
  payment_date: (payment?.payment_date ?? formatDateToYYYYMMDD(new Date().toISOString())) || "",
  notes: payment?.notes ?? "",
  attachment: payment?.attachments && payment.attachments.length > 0 ? payment.attachments[0] : null,
});
