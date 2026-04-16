import api from "@/lib/api";

export const getProsecutionSessions = async (caseId: number, page?: number, limit?: number) => {
  const response = await api.get(`/prosecution-session/case-presecution-sessions/${caseId}`, {
    params: { page, limit },
  });
  return response.data;
};
