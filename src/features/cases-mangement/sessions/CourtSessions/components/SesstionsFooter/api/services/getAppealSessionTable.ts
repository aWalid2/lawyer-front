import api from "@/lib/api";

export const getAppealSessionTable = async (caseId: string | number, page?: number, limit?: number) => {
    const response = await api.get(`/appeal-session/${caseId}`, { params: { page, limit } });
    return response.data;
};
