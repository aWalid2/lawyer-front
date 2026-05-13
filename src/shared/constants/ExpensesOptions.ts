
type ExpenseOption = {
  value: string;
  label: string;
};

export const EXPENSE_TYPE_OPTIONS: ExpenseOption[] = [
  { value: "all", label: "نوع المصروف" },
  { value: "court-fees", label: "رسوم محكمة" },
  { value: "administrative-fees", label: "رسوم إدارية" },
  { value: "transportation", label: "انتقالات" },
  { value: "printing-and-copying", label: "طباعة وتصوير" },
  { value: "other-expenses", label: "مصاريف أخرى" },
];

export const REPORT_EXPENSE_TYPE_OPTIONS: ExpenseOption[] = [
  { value: "all", label: "نوع المصروف" },
  { value: "court-fees", label: "رسوم محكمة" },
  { value: "administrative-fees", label: "رسوم إدارية" },
  { value: "transportation", label: "انتقالات" },
  { value: "printing-and-copying", label: "طباعة وتصوير" },
  { value: "other-expenses", label: "مصاريف أخرى" },
];