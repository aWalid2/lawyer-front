import api from "@/lib/api";
import type { ExpenseRequestPayload } from "./buildExpenseFormData";

interface UpdateCaseExpensePayload {
  expenseId: string | number;
  data: ExpenseRequestPayload;
}

export const updateCaseExpense = async ({
  expenseId,
  data,
}: UpdateCaseExpensePayload) => {
  const response = await api.patch(`/case-expenses/${expenseId}`, data,
    data instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : undefined,
  );

  return response.data;
};