import api from "@/lib/api";

export const deleteRelatedCase = async (relatedCaseId: string) => {
  const response = await api.delete(`/related-case/${relatedCaseId}`);

  return response.data;
};