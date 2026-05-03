import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

export interface ExpenseItem {
  id: string;
  expenseType: string;
  description: string;
  amount: number;
  expenseDate: string;
  notes: string;
  attachments: string[];
  rowNumber?: number;
}

export interface ExpenseFormValues {
  expenseType: string;
  description: string;
  amount: number | "";
  expenseDate: string;
  notes: string;
  attachments: FileList | string[] | null;
}

export const EXPENSE_TYPE_OPTIONS = [
  { label: "رسوم محكمة", value: "رسوم محكمة" },
  { label: "رسوم إدارية", value: "رسوم إدارية" },
  { label: "انتقالات", value: "انتقالات" },
  { label: "طباعة وتصوير", value: "طباعة وتصوير" },
  { label: "مصاريف أخرى", value: "مصاريف أخرى" },
];

export const EMPTY_EXPENSE_FORM_VALUES: ExpenseFormValues = {
  expenseType: "",
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
  description: expense?.description ?? "",
  amount: expense?.amount ?? "",
  expenseDate: formatDateToYYYYMMDD(expense?.expenseDate) || "",
  notes: expense?.notes ?? "",
  attachments: expense?.attachments ?? null,
});