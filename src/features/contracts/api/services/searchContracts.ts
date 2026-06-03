import api from "@/lib/api";
import type { ContractApiItem } from "./getContracts";

export interface SearchContractsResponse {
  data: ContractApiItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface SearchContractsParams {
  q: string;
  page?: number;
  limit?: number;
}

export const searchContracts = async (
  params: SearchContractsParams,
): Promise<SearchContractsResponse> => {
  const queryParams: Record<string, string | number> = {};

  queryParams.q = params.q;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;

  const { data } = await api.get("/contracts/search", {
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
