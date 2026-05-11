import api from "@/lib/api";
import type {
  ClientStatus,
  ClientStatusesResponse,
} from "../types/clientStatus";

type ClientStatusesApiResponse =
  | ClientStatus[]
  | {
      data?: ClientStatus[];
      meta?: {
        total_pages?: number;
      };
    };

export const getClientStatuses = async (
  page?: number,
  limit?: number,
): Promise<ClientStatusesResponse> => {
  const currentPage = page ?? 1;
  const currentLimit = limit ?? 15;

  const { data } = await api.get<ClientStatusesApiResponse>("/client-status", {
    params: { page, limit },
  });

  if (Array.isArray(data)) {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    return {
      data: data.slice(startIndex, endIndex),
      meta: {
        total_pages: Math.max(1, Math.ceil(data.length / currentLimit)),
      },
    };
  }

  const statuses = data.data ?? [];
  const totalPages = data.meta?.total_pages;

  return {
    data: totalPages
      ? statuses
      : statuses.slice(
          (currentPage - 1) * currentLimit,
          currentPage * currentLimit,
        ),
    meta: {
      total_pages:
        totalPages ?? Math.max(1, Math.ceil(statuses.length / currentLimit)),
    },
  };
};
