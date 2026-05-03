import api from "@/lib/api";

export const deleteCaseExpense = async (expenseId: string | number) => {
  const response = await api.delete(`/case-expenses/${expenseId}`);
  return response.data;
};