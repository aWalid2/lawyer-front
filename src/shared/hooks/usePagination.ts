import { useState, useMemo, useEffect } from "react";

/**
 * A reusable hook for handling array-based pagination.
 * 
 * @param data The full array of items to paginate.
 * @param itemsPerPage The number of items to show per page. Defaults to 15.
 */
export function usePagination<T>(data: T[], itemsPerPage: number = 15) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when data changes (e.g., search/filter)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
    totalItems: data.length,
  };
}
