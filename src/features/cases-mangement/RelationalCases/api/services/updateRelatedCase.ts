import api from "@/lib/api";

interface RelatedCasePayload {
  related_case_id: number;
}

export const updateRelatedCase = async (
  caseId: number,
  relatedCaseId: number,
  payload: RelatedCasePayload
) => {
  const response = await api.patch(
    `/related-case/case/${caseId}/related-case/${relatedCaseId}`,
    payload
  );

  return response.data;
};