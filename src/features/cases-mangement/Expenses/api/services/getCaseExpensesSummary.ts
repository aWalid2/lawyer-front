import api from "@/lib/api";
import type { ExpenseSummary } from "../../types";

interface ExpenseSummaryApiResponse {
  total_amount?: string | number | null;
  data?: string | null;
}

export const getCaseExpensesSummary = async (
  caseId: string | number,
): Promise<ExpenseSummary | null> => {
  const response = await api.get<ExpenseSummaryApiResponse>(
    `/case-expenses/${caseId}/expenses`,
  );

  const payload = response.data;
  if (!payload) {
    return null;
  }

  return {
    totalAmount: Number(payload.total_amount ?? 0),
    latestExpenseDate: payload.data ?? null,
  };
};