import api from "@/lib/api";

export const createProsecutionSessions = async ({ caseId, data }: { caseId: number; data: any }) => {
    const response = await api.post(`/prosecution-session/case/${caseId}/session`, data);
    return response.data;
}
