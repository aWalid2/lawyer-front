import { useQuery } from "@tanstack/react-query";
import { getCaseTypes } from "@/features/settings/case-types/api/services/getCaseTypes";
import type { ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type CaseTypeEntity = {
  id: number | string;
  name: string;
};

export const useCaseTypesSelect = (page: number = 1) => {
  return useQuery({
    queryKey: ["case-types-select", page],
    queryFn: async () => {
      const response = await getCaseTypes(page, 15);
      return (response.data ?? []).map((caseType: CaseTypeEntity) => ({
        label: caseType.name,
        value: String(caseType.id),
      }));
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
