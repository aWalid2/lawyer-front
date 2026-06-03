import { useQuery } from "@tanstack/react-query";
import { searchContracts } from "../services/searchContracts";

interface UseSearchContractsParams {
  q: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export const useSearchContracts = ({
  q,
  page = 1,
  limit = 15,
  enabled = true,
}: UseSearchContractsParams) => {
  return useQuery({
    queryKey: ["contracts-search", q, page, limit],
    queryFn: () => searchContracts({ q, page, limit }),
    enabled: enabled && q.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });
};
