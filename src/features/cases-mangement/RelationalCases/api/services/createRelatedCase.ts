import api from "@/lib/api";

interface RelatedCasePayload {
  related_case_id: number;
}

export const createRelatedCase = async (
  caseId: string,
  payload: RelatedCasePayload
) => {
  const response = await api.post(`/related-case/case/${caseId}`, payload);

  return response.data;
};