import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export interface PaymentItem {
  id: string;
  payment_type: string;
  employeeId: number | null;
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
  employeeId: number | "";
  employee_name: string;
  payment_description: string;
  amount: number | "";
  payment_date: string;
  notes: string;
}

export interface PaymentSummary {
  totalAmount: number;
  latestPaymentDate: string | null;
}

export const EMPTY_PAYMENT_FORM_VALUES: PaymentFormValues = {
  payment_type: "",
  employeeId: "",
  employee_name: "",
  payment_description: "",
  amount: "",
  payment_date: formatDateToYYYYMMDD(new Date().toISOString()) || "",
  notes: "",
};

export const toPaymentFormValues = (payment?: PaymentItem | null): PaymentFormValues => ({
  payment_type: payment?.payment_type ?? "",
  employeeId: payment?.employeeId ?? "",
  employee_name: payment?.employee_name ?? "",
  payment_description: payment?.payment_description ?? "",
  amount: payment?.amount ?? "",
  payment_date: (payment?.payment_date ?? formatDateToYYYYMMDD(new Date().toISOString())) || "",
  notes: payment?.notes ?? "",
});
