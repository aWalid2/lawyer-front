import type { PaymentItem } from "@/features/cases-mangement/Payments/types";

interface PaymentApiItem {
  id?: number | string;
  payment_type?: string | null;
  employee_id?: string | number | null;
  description?: string | null;
  amount?: string | number | null;
  payment_date?: string | null;
  notes?: string | null;
  attachment?: string | null;
  employe?: { first_name?: string | null } | null;
  employee?: { user?: { first_name?: string | null } } | null;
}

const toAttachmentList = (attachment?: string | null) => {
  if (!attachment || typeof attachment !== "string") return [];
  return [attachment];
};

export const normalizeCasePayment = (p?: PaymentApiItem | null): PaymentItem => ({
  id: String(p?.id ?? ""),
  paymentType: p?.payment_type ?? "",
  employeeId: Number(p?.employee_id ?? 0) || null,
  employeeName: p?.employe?.first_name ?? p?.employee?.user?.first_name ?? "-",
  description: p?.description ?? "",
  amount: Number(p?.amount ?? 0),
  paymentDate: p?.payment_date ?? "",
  notes: p?.notes ?? "",
  attachments: toAttachmentList(p?.attachment),
});
