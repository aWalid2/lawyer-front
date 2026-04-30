import api from "@/lib/api";

export const getCassaionSessionTable = async (caseId: string | number, page?: number, limit?: number) => {
    const response = await api.get(`/cassation-session/${caseId}`, {
        params: {
            page,
            limit,
        },
    });
    return response.data;
};