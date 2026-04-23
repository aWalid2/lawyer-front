import api from "@/lib/api";

export const deleteRelatedCase = async (relatedCaseId: number) => {
  const response = await api.delete(`/related-case/${relatedCaseId}`);

  return response.data;
};