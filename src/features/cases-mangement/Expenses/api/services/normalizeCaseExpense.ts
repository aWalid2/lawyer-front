import type { ExpenseItem } from "../../types";

interface ExpenseApiItem {
  id?: number | string;
  expense_type?: string | null;
  description?: string | null;
  amount?: string | number | null;
  expense_date?: string | null;
  notes?: string | null;
  attachment?: string | null;
}

const toAttachmentList = (attachment?: string | null) => {
  if (!attachment || typeof attachment !== "string") {
    return [];
  }

  return [attachment];
};

export const normalizeCaseExpense = (
  expense?: ExpenseApiItem | null,
): ExpenseItem => ({
  id: String(expense?.id ?? ""),
  expenseType: expense?.expense_type ?? "",
  description: expense?.description ?? "",
  amount: Number(expense?.amount ?? 0),
  expenseDate: expense?.expense_date ?? "",
  notes: expense?.notes ?? "",
  attachments: toAttachmentList(expense?.attachment),
});