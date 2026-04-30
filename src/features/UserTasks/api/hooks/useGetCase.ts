
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { fetchCases } from "../service/getCases";
import {
  useInfinitePaginatedQuery,
  type InfinitePaginationMeta,
} from "../../../../shared/hooks/useInfinitePaginatedQuery";

const DEFAULT_CASES_LIMIT = 15;
const CASES_QUERY_STALE_TIME = 1000 * 60 * 2;
const CASES_QUERY_RETRY = 2;
const CASES_ERROR_MESSAGE = "Failed to fetch cases. Please try again later.";

export interface CaseListItem {
  id?: number | string;
  case_id?: number | string;
  case_title?: string;
}

type CasesResponse =
  | {
      meta?: InfinitePaginationMeta;
      data?:
        | {
            meta?: InfinitePaginationMeta;
            data?: CaseListItem[];
          }
        | CaseListItem[];
    }
  | CaseListItem[];

const getCasesMeta = (response?: CasesResponse) => {
  if (!response) {
    return undefined;
  }

  if (Array.isArray(response)) {
    return undefined;
  }

  if (Array.isArray(response.data)) {
    return response.meta;
  }

  return response.meta ?? response.data?.meta;
};

export const extractCasesList = (response?: CasesResponse) => {
  if (!response) {
    return [];
  }

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data?.data)) {
    return response.data.data;
  }

  return [];
};

export const useFetchCases = () => {
  const query = useQuery({
    queryKey: ["case-tasks"],
    queryFn: () => fetchCases(),
    staleTime: CASES_QUERY_STALE_TIME,
    retry: CASES_QUERY_RETRY,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || CASES_ERROR_MESSAGE);
    }
  }, [query.error]);
  

  return query;
};

export const useFetchCasesInfinite = (limit = DEFAULT_CASES_LIMIT) => {
  return useInfinitePaginatedQuery({
    queryKey: ["case-tasks", "infinite", limit],
    queryFn: (page: number) => fetchCases(page, limit),
    extractMeta: getCasesMeta,
    extractItems: extractCasesList,
    limit,
    staleTime: CASES_QUERY_STALE_TIME,
    retry: CASES_QUERY_RETRY,
    errorMessage: CASES_ERROR_MESSAGE,
  });
};