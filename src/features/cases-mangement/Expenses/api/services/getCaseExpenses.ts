import api from "@/lib/api";
import type { ExpenseItem } from "../../types";
import { normalizeCaseExpense } from "./normalizeCaseExpense";

interface ExpenseListResponse {
  data: ExpenseItem[];
  meta: {
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export const getCaseExpenses = async (
  caseId: string | number,
): Promise<ExpenseListResponse> => {
  const response = await api.get(`/case-expenses/case/${caseId}`);
  const data = Array.isArray(response.data?.data)
    ? response.data.data
    : Array.isArray(response.data)
      ? response.data
      : [];

  return {
    data: data.map(normalizeCaseExpense),
    meta: {
      total: response.data?.meta?.total ?? data.length,
      page: response.data?.meta?.page,
      limit: response.data?.meta?.limit,
      totalPages: response.data?.meta?.totalPages,
    },
  };
};