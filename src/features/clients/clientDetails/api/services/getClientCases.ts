import api from "@/lib/api";

export const getClientCases = async ({ id, page, limit }: { id: string, page: number, limit: number }) => {
    const response = await api.get(`/cases/client/${id}?page=${page}&limit=${limit}`);
    return response.data;
};