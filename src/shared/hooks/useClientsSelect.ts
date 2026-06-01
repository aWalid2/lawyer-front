import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/shared/api/services/getClients";
import type { ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type ClientOptionEntity = {
  user_id: number | string;
  name: string;
};

export const useClientsSelect = (page: number = 1) => {
  return useQuery({
    queryKey: ["clients-select", page],
    queryFn: async () => {
      const response = await fetchClients(page, 15);
      return (response.data ?? []).map((client: ClientOptionEntity) => ({
        label: client.name,
        value: String(client.user_id),
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes in cache
  });
};
