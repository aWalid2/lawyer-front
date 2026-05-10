import type { ExpenseFormValues } from "../../types";

export interface ExpenseRequestBody {
  expense_type: string;
  employee_id: number;
  description: string;
  amount: number;
  expense_date: string;
  notes: string;
}

export type ExpenseRequestPayload = FormData | ExpenseRequestBody;

export const buildExpenseFormData = (values: ExpenseFormValues) => {
  const employeeId =
    typeof values.employeeId === "number"
      ? values.employeeId
      : Number(values.employeeId);
  const amount =
    typeof values.amount === "number" ? values.amount : Number(values.amount);

  if (
    !(values.attachments instanceof FileList) ||
    values.attachments.length === 0
  ) {
    return {
      expense_type: values.expenseType,
      employee_id: employeeId,
      description: values.description,
      amount,
      expense_date: values.expenseDate,
      notes: values.notes || "",
    } satisfies ExpenseRequestBody;
  }

  const formData = new FormData();

  formData.append("expense_type", values.expenseType);
  formData.append("employee_id", String(employeeId));
  formData.append("description", values.description);
  formData.append("amount", String(amount));
  formData.append("expense_date", values.expenseDate);
  formData.append("notes", values.notes || "");

  if (values.attachments.length > 0) {
    formData.append("file", values.attachments[0]);
  }

  return formData;
};