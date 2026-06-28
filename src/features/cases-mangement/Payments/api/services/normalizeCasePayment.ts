import type { PaymentItem } from "@/features/cases-mangement/Payments/types";

interface PaymentApiItem {
  id?: number | string;
  payment_type?: string | null;
  case_id?: number | null;
  employee_id?: number | string | null;
  employee_name?: string | null;
  payment_description?: string | null;
  amount?: string | number | null;
  payment_date?: string | null;
  notes?: string | null;
  attachment?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  employee?:{
    first_name:string;
  }
}

const toAttachmentList = (attachment?: string | null) => {
  if (!attachment || typeof attachment !== "string") return [];
  return [attachment];
};

export const normalizeCasePayment = (p?: PaymentApiItem | null): PaymentItem => ({
  id: String(p?.id ?? ""),
  payment_type: p?.payment_type ?? "",
  employee_id: p?.employee_id ? Number(p.employee_id) : "",
  employee_name: p?.employee?.first_name ?? "-",
  payment_description: p?.payment_description ?? "",
  amount: Number(p?.amount ?? 0),
  payment_date: p?.payment_date ?? "",
  notes: p?.notes ?? "",
  attachments: toAttachmentList(p?.attachment),
  caseId: p?.case_id ?? undefined,
  createdAt: p?.created_at ?? undefined,
  updatedAt: p?.updated_at ?? undefined,
});
