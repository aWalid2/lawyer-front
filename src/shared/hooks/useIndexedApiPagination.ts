import { useMemo } from "react";
import { useIndexedData } from "@/shared/utils/useIndexedData";

interface PaginationMeta {
  total?: number;
  totalPages?: number;
  lastPage?: number;
  total_pages?: number;
  last_page?: number;
}

interface UseIndexedApiPaginationProps<T> {
  data?: T[];
  page: number;
  itemsPerPage: number;
  meta?: PaginationMeta;
}

export const useIndexedApiPagination = <T,>({
  data = [],
  page,
  itemsPerPage,
  meta,
}: UseIndexedApiPaginationProps<T>) => {
  const indexedData = useIndexedData(data, page, itemsPerPage);

  const totalPages = useMemo(() => {
    return (
      meta?.totalPages ??
      meta?.lastPage ??
      meta?.total_pages ??
      meta?.last_page ??
      (Math.ceil((meta?.total ?? data.length) / itemsPerPage) || 1)
    );
  }, [
    data.length,
    itemsPerPage,
    meta?.lastPage,
    meta?.last_page,
    meta?.total,
    meta?.totalPages,
    meta?.total_pages,
  ]);

  return {
    indexedData,
    totalPages,
  };
};