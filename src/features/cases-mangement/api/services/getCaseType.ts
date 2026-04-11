import api from "@/lib/api";


export const getCaseType = async () => {
    const response = await api.get(`case-type`);
    return response.data;
};