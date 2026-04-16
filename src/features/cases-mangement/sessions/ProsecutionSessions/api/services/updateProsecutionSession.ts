import api from "@/lib/api";

export const updateProsecutionSession = async ({ caseId, data }: { caseId: number; data: any }) => {
    const response = await api.patch(`/prosecution/case-data/${caseId}`, data);
    return response.data;
};
