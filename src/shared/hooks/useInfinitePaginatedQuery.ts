import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export interface InfinitePaginationMeta {
  page?: number;
  current_page?: number;
  currentPage?: number;
  total_pages?: number;
  last_page?: number;
  totalPages?: number;
  lastPage?: number;
  next_page?: number;
  has_next?: boolean;
}

interface UseInfinitePaginatedQueryProps<TPage> {
  queryKey: QueryKey;
  queryFn: (page: number) => Promise<TPage>;
  extractMeta: (page: TPage) => InfinitePaginationMeta | undefined;
  extractItems: (page: TPage) => unknown[];
  limit: number;
  errorMessage: string;
  initialPage?: number;
  staleTime?: number;
  retry?: number;
}

export const useInfinitePaginatedQuery = <TPage,>({
  queryKey,
  queryFn,
  extractMeta,
  extractItems,
  limit,
  errorMessage,
  initialPage = 1,
  staleTime,
  retry,
}: UseInfinitePaginatedQueryProps<TPage>) => {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: initialPage,
    staleTime,
    retry,
    getNextPageParam: (lastPage, allPages) => {
      const meta = extractMeta(lastPage);
      const currentPage =
        meta?.page ?? meta?.current_page ?? meta?.currentPage ?? allPages.length;
      const totalPages =
        meta?.total_pages ?? meta?.last_page ?? meta?.totalPages ?? meta?.lastPage;

      if (typeof meta?.next_page === "number") {
        return meta.next_page;
      }

      if (meta?.has_next === false) {
        return undefined;
      }

      if (typeof totalPages === "number" && currentPage >= totalPages) {
        return undefined;
      }

      const items = extractItems(lastPage);
      if (items.length < limit) {
        return undefined;
      }

      return currentPage + 1;
    },
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || errorMessage);
    }
  }, [errorMessage, query.error]);

  return query;
};