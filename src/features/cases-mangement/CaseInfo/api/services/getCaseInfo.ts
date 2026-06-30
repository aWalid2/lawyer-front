import api from "@/lib/api";


export const getCaseInfo = async (caseId: string) => {
    const response = await api.get(`cases/caseData/${caseId}`);
    console.log(response.data)
    return response.data;
};