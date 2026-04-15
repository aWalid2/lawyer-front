import api from "@/lib/api";

export const updateProsecutionSessions = async ({ caseId, data }: { caseId: number; data: any }) => {
    const response = await api.patch(`/prosecution/case-data/${caseId}`, data);
    return response.data;
}
