import api from "@/lib/api";

export const createFirstInstanceSessionTable = async (caseId: number, data: any) => {
    const response = await api.post(`/first-instance/${caseId}`, data);
    return response.data;
};
