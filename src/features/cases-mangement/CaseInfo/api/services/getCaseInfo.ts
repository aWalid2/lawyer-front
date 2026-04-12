import api from "@/lib/api";


export const getCaseInfo = async (caseId: string) => {
    const response = await api.get(`cases/caseData/${caseId}`);
    return response.data;
};