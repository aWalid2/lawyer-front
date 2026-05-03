import api from "@/lib/api";
import { normalizeCaseExpense } from "./normalizeCaseExpense";

export const getCaseExpense = async (expenseId: string | number) => {
  const response = await api.get(`/case-expenses/${expenseId}`);
  const payload = response.data?.data ?? response.data;

  return normalizeCaseExpense(payload);
};