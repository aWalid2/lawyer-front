import api from "@/lib/api";

export const getCassaionSessionTable = async (caseId: string | number) => {
    const response = await api.get(`/cassation-session/${caseId}`);
    return response.data;
};