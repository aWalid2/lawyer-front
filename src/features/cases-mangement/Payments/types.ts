import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export interface PaymentItem {
  id: string;
  paymentType: string;
  employeeId: number | null;
  employeeName: string;
  description: string;
  amount: number;
  paymentDate: string;
  notes: string;
  attachments: string[];
  rowNumber?: number;
}

export interface PaymentFormValues {
  paymentType: string;
  employeeId: number | "";
  description: string;
  amount: number | "";
  paymentDate: string;
  notes: string;
  attachments: FileList | string[] | null;
}

export interface PaymentSummary {
  totalAmount: number;
  latestPaymentDate: string | null;
}

export const EMPTY_PAYMENT_FORM_VALUES: PaymentFormValues = {
  paymentType: "",
  employeeId: "",
  description: "",
  amount: "",
  paymentDate: formatDateToYYYYMMDD(new Date().toISOString()) || "",
  notes: "",
  attachments: null,
};

export const toPaymentFormValues = (payment?: PaymentItem | null): PaymentFormValues => ({
  paymentType: payment?.paymentType ?? "",
  employeeId: payment?.employeeId ?? "",
  description: payment?.description ?? "",
  amount: payment?.amount ?? "",
  paymentDate: (payment?.paymentDate ?? formatDateToYYYYMMDD(new Date().toISOString())) || "",
  notes: payment?.notes ?? "",
  attachments: payment?.attachments ?? null,
});
