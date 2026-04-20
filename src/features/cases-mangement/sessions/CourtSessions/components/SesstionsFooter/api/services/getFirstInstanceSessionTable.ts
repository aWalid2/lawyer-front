import api from "@/lib/api";

export const getFirstInstanceSessionTable = async (caseId: number, page?: number, limit?: number) => {
    const response = await api.get(`/first-instance/sessions/${caseId}`, {
        params: {
            page,
            limit,
        },
    });
    return response.data;
};
