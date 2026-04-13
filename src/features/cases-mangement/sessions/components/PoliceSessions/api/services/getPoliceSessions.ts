import api from "@/lib/api";


export const getPoliceSessions = async (caseId: number, page?: number, limit?: number) => {
  const response = await api.get(`/police-sessions/case-session/${caseId}`, {
    params: { page, limit },
  });
  return response.data;
};