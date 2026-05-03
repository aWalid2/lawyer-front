import type { ExpenseFormValues } from "../../types";

export const buildExpenseFormData = (values: ExpenseFormValues) => {
  const formData = new FormData();

  formData.append("expense_type", values.expenseType);
  formData.append("description", values.description);
  formData.append("amount", String(values.amount));
  formData.append("expense_date", values.expenseDate);
  formData.append("notes", values.notes || "");

  if (values.attachments instanceof FileList && values.attachments.length > 0) {
    formData.append("file", values.attachments[0]);
  }

  return formData;
};