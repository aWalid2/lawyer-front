import { useState, useEffect } from "react";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

interface UseApiPaginationProps {
  meta?: PaginationMeta;
  initialPage?: number;
}

export function useApiPagination({ meta, initialPage = 1 }: UseApiPaginationProps) {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (meta?.page && meta.page !== page) {
      setPage(meta.page);
    }
  }, [meta?.page]);

  return {
    page,
    setPage,

    totalPages: meta?.total_pages ?? 1,
    totalItems: meta?.total ?? 0,
    limit: meta?.limit ?? 15,

    hasNext: meta?.has_next ?? false,
    hasPrev: meta?.has_prev ?? false,
  };
}