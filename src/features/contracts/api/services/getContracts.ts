import api from "@/lib/api";

export interface GetContractsParams {
  page?: number;
  limit?: number;
  endDateFrom?: Date;
  endDateTo?: Date;
  contractValueMin?: string;
  contractValueMax?: string;
}

export interface ContractApiItem {
  id?: number | string;
  client_id?: number | string | null;
  start_date?: string | null;
  end_date?: string | null;
  contract_value?: string | number | null;
  contract_duration?: string | number | null;
  document_file?: string | null;
  created_at?: string | null;
  contract_title:string;
  client_profile?: {
    user_id?: number;
    name?: string | null;
    client_type?: string;
    date_joined?: string;
    case_count?: number;
    contract_photo?: string;
    authorization_photo?: string;
    notes?: string;
  } | null;
  cases_related_contracts?:string | number;
  contract_payment: string | number | null;
}

export interface ContractsResponse {
  data?: ContractApiItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

export const getContracts = async (
  params: GetContractsParams = {},
): Promise<ContractsResponse> => {
  const queryParams: Record<string, string | number> = {};
  const endDateFrom = formatDateParam(params.endDateFrom);
  const endDateTo = formatDateParam(params.endDateTo);

  if (params.page) {
    queryParams.page = params.page;
  }

  if (params.limit) {
    queryParams.limit = params.limit;
  }

  if (endDateFrom) {
    queryParams.end_date_from = endDateFrom;
  }

  if (endDateTo) {
    queryParams.end_date_to = endDateTo;
  }

  if (params.contractValueMin?.trim()) {
    queryParams.contract_value_min = params.contractValueMin.trim();
  }

  if (params.contractValueMax?.trim()) {
    queryParams.contract_value_max = params.contractValueMax.trim();
  }

  const { data } = await api.get("/contracts/all-contracts", {
    params: queryParams,
  });

  const items = Array.isArray(data?.data) ? data.data : [];
  const total = Number(data?.total ?? items.length ?? 0);
  const page = Number(data?.page ?? params.page ?? 1);
  const limit = Number(data?.limit ?? params.limit ?? 10);

  return {
    data: items,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};