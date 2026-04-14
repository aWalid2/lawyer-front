import api from "@/lib/api";

export const createProsecutionSession = async ({ caseId, data }: { caseId: number; data: any }) => {
    const response = await api.post(`/prosecution/case-data/${caseId}`, data);
    return response.data;
};
