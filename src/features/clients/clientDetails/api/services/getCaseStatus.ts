import api from "@/lib/api";


export const getCaseStatus = async () => {
    const response = await api.get(`case-status`);
    return response.data;
};