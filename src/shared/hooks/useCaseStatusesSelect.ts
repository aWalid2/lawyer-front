import { useQuery } from "@tanstack/react-query";
import { fetchCaseStatuses } from "@/features/settings/case-statuses/api/service/getCaseStatuses";
import type { ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type SelectOptionEntity = {
  id: number | string;
  name: string;
};

export const useCaseStatusesSelect = (page: number = 1) => {
  return useQuery({
    queryKey: ["case-statuses-select", page],
    queryFn: async () => {
      const response = await fetchCaseStatuses(page, 15);
      return (response.data ?? []).map((caseStatus: SelectOptionEntity) => ({
        label: caseStatus.name,
        value: String(caseStatus.id),
      }));
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
