import api from "@/lib/api";

export interface ReportExpenseApiItem {
  id?: number | string;
  case_id?: number | null;
  expense_type?: string | null;
  description?: string | null;
  employee_id?: number | null;
  amount?: string | number | null;
  expense_date?: string | null;
  notes?: string | null;
  attachment?: string | null;
  case?: {
    id?: number | null;
    case_title?: string | null;
    case_sequence?: string | null;
  } | null;
}

export interface ReportExpensesResponse {
  data?: ReportExpenseApiItem[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    
  };
}

export const getAllCaseExpenses = async (
  page?: number,
  limit?: number,
): Promise<ReportExpensesResponse> => {
  const { data } = await api.get("/reports/allCaseExpenses", {
    params: { page, limit },
  });

  return data;
};