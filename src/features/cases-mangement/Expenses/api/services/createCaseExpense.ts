import api from "@/lib/api";
import type { ExpenseRequestPayload } from "./buildExpenseFormData";

interface CreateCaseExpensePayload {
  caseId: string | number;
  data: ExpenseRequestPayload;
}

export const createCaseExpense = async ({
  caseId,
  data,
}: CreateCaseExpensePayload) => {
  const response = await api.post(`/case-expenses/${caseId}`, data,
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