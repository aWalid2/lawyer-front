import api from "@/lib/api";
import type { RelatedCaseRecord } from "../../types";

export const getRelatedCases = async (caseId: string) => {
  const response = await api.get<RelatedCaseRecord[]>(
    `/related-case/${caseId}/all-relatedCases`
  );

  return response.data;
};