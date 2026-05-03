import api from "@/lib/api";

interface UpdateCaseExpensePayload {
  expenseId: string | number;
  data: FormData;
}

export const updateCaseExpense = async ({
  expenseId,
  data,
}: UpdateCaseExpensePayload) => {
  const response = await api.put(`/case-expenses/${expenseId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};