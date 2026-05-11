import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export interface ExpenseItem {
  id: string;
  expenseType: string;
  employeeId: number | null;
  employeeName: string;
  description: string;
  amount: number;
  expenseDate: string;
  notes: string;
  attachments: string[];
  rowNumber?: number;
  employe?: {
    first_name: string;
  };
}

export interface ExpenseFormValues {
  expenseType: string;
  employeeId: number | "";
  description: string;
  amount: number | "";
  expenseDate: string;
  notes: string;
  attachments: FileList | string[] | null;
}

export interface ExpenseSummary {
  totalAmount: number;
  latestExpenseDate: string | null;
}


export const EMPTY_EXPENSE_FORM_VALUES: ExpenseFormValues = {
  expenseType: "",
  employeeId: "",
  description: "",
  amount: "",
  expenseDate: "",
  notes: "",
  attachments: null,
};

export const toExpenseFormValues = (
  expense?: ExpenseItem | null,
): ExpenseFormValues => ({
  expenseType: expense?.expenseType ?? "",
  employeeId: expense?.employeeId ?? "",
  description: expense?.description ?? "",
  amount: expense?.amount ?? "",
  expenseDate: formatDateToYYYYMMDD(expense?.expenseDate) || "",
  notes: expense?.notes ?? "",
  attachments: expense?.attachments ?? null,
});