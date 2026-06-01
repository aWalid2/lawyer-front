import { useQuery } from "@tanstack/react-query";
import { getClientStatuses } from "@/features/settings/client-statuses/api/services/getClientStatuses";
import type { ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type SelectOptionEntity = {
  id: number | string;
  name: string;
};

export const useClientStatusesSelect = (page: number = 1) => {
  return useQuery({
    queryKey: ["client-statuses-select", page],
    queryFn: async () => {
      const response = await getClientStatuses(page, 15);
      return (response.data ?? []).map((clientStatus: SelectOptionEntity) => ({
        label: clientStatus.name,
        value: String(clientStatus.id),
      }));
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
