import { useQuery } from "@tanstack/react-query";
import { usePaginatedOptions } from "./usePaginatedOptions";
import type { ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type PaginatedFetchResult<T> = {
  items: T[];
  totalPages: number;
};

/**
 * Hook that combines React Query caching with pagination
 * Caches API results globally so subsequent dialog opens don't refetch
 */
export const useCachedPaginatedOptions = <T extends SelectOption>(
  fetchFn: (page: number, search?: string) => Promise<PaginatedFetchResult<T>>,
  search: string,
  cacheKey: string,
) => {
  // Use React Query to cache each page globally
  useQuery({
    queryKey: [cacheKey, search],
    queryFn: async () => {
      // Fetch all pages up to current when search changes
      const result = await fetchFn(1, search);
      return result;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in memory for 30 minutes
  });

  // Use pagination hook for scroll-based loading
  const { options, hasMoreOptions, isFetchingMore, loadNextPage } = usePaginatedOptions(
    fetchFn,
    search,
  );

  return {
    options,
    hasMoreOptions,
    isFetchingMore,
    loadNextPage,
  };
};
