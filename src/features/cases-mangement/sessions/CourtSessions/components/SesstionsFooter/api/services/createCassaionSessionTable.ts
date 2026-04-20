import api from "@/lib/api";

export const createCassaionSessionTable = async (caseId: string | number, data: any) => {
    const response = await api.post(`/cassation-session/${caseId}`, data);
    return response.data;
};