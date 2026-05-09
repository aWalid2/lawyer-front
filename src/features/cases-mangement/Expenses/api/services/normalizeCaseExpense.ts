import type { ExpenseItem } from "../../types";

interface ExpenseApiItem {
  id?: number | string;
  expense_type?: string | null;
  employee_id?: string | number | null;
  Employee_id?: string | number | null;
  description?: string | null;
  amount?: string | number | null;
  expense_date?: string | null;
  notes?: string | null;
  attachment?: string | null;
  employee?: {
    user?: {
      first_name?: string | null;
    };
  } | null;
  Employee?: {
    user?: {
      first_name?: string | null;
    };
  } | null;
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
  employeeId: Number(expense?.employee_id ?? expense?.Employee_id ?? 0) || null,
  employeeName:
    expense?.employee?.user?.first_name ??
    expense?.Employee?.user?.first_name ??
    "-",
  description: expense?.description ?? "",
  amount: Number(expense?.amount ?? 0),
  expenseDate: expense?.expense_date ?? "",
  notes: expense?.notes ?? "",
  attachments: toAttachmentList(expense?.attachment),
});