import api from "@/lib/api";

export interface GetAllCaseExpensesParams {
  page?: number;
  limit?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

const formatDateParam = (date?: Date) => {
  if (!date) {
    return undefined;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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
  employe?: {
   
    first_name?: string | null;
  
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
  params: GetAllCaseExpensesParams = {},
): Promise<ReportExpensesResponse> => {
  const queryParams: Record<string, number | string> = {};
  const dateFrom = formatDateParam(params.dateFrom);
  const dateTo = formatDateParam(params.dateTo);

  if (params.page) {
    queryParams.page = params.page;
  }

  if (params.limit) {
    queryParams.limit = params.limit;
  }

  if (dateFrom) {
    queryParams.date_from = dateFrom;
  }

  if (dateTo) {
    queryParams.date_to = dateTo;
  }

  const { data } = await api.get("/reports/allCaseExpenses", {
    params: queryParams,
  });

  return data;
};