import api from "@/lib/api";

export const getCaseDocuments = async (caseId: string) => {
  const response = await api.get(`/documnet/caseDocuments/${caseId}`);
  return response.data;
};