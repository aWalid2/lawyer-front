import api from "@/lib/api";


export const getCaseType = async () => {
    const response = await api.get(`cases/caseType`);
    return response.data;
};