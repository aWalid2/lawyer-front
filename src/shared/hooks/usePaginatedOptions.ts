import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type PaginatedFetchResult<T> = {
  items: T[];
  totalPages: number;
};

type UsePaginatedOptionsResult<T> = {
  options: T[];
  hasMoreOptions: boolean;
  isFetchingMore: boolean;
  isLoading: boolean;
  hasError: boolean;
  retry: () => void;
  loadNextPage: () => void;
};

export const usePaginatedOptions = <T extends { label: ReactNode; value: string | number }>(
  fetchPage: (page: number, query?: string) => Promise<PaginatedFetchResult<T>>,
  query = "",
  initialPage = 1,
  enabled = true,
) => {
  const [options, setOptions] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const mountedRef = useRef(true);
  const hasLoadedOnceRef = useRef(false);
  const prevQueryRef = useRef(query);

  const loadPage = useCallback(
    async (page: number) => {
      setIsLoading(page === 1 && !hasLoadedOnceRef.current);
      setIsFetchingMore(true);
      setHasError(false);
      try {
        const response = await fetchPage(page, query);
        if (!mountedRef.current) return;
        setOptions((prev) => (page === 1 ? response.items : [...prev, ...response.items]));
        setTotalPages(response.totalPages);
        setCurrentPage(page);
        if (page === 1) hasLoadedOnceRef.current = true;
      } catch {
        if (!mountedRef.current) return;
        setHasError(true);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      }
    },
    [fetchPage, query],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fetch on enable, but only if data hasn't been loaded yet for this query
  useEffect(() => {
    if (!enabled) return;
    // If query changed, reset and refetch
    if (query !== prevQueryRef.current) {
      prevQueryRef.current = query;
      hasLoadedOnceRef.current = false;
    }
    if (hasLoadedOnceRef.current && options.length > 0) return;
    setOptions([]);
    setCurrentPage(initialPage);
    setHasError(false);
    loadPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPage, initialPage, query, enabled]);

  const retry = useCallback(() => {
    if (!isFetchingMore && !isLoading) {
      hasLoadedOnceRef.current = false;
      loadPage(currentPage === initialPage ? initialPage : currentPage);
    }
  }, [isFetchingMore, isLoading, loadPage, currentPage, initialPage]);

  const loadNextPage = useCallback(() => {
    if (currentPage >= totalPages || isFetchingMore || isLoading) return;
    loadPage(currentPage + 1);
  }, [currentPage, totalPages, isFetchingMore, isLoading, loadPage]);

  return {
    options,
    hasMoreOptions: currentPage < totalPages,
    isFetchingMore,
    isLoading,
    hasError,
    retry,
    loadNextPage,
  } as UsePaginatedOptionsResult<T>;
};
