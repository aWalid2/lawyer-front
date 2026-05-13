import { EXPENSE_TYPE_OPTIONS } from "@/shared/constants/ExpensesOptions";
import { getOptionLabel } from "./getOptionLabel";

export const getExpenseTypeLabel = (value?: string) => {
  if (!value) {
    return value;
  }

  return getOptionLabel(value, EXPENSE_TYPE_OPTIONS);
};