import api from "@/lib/api";

export const getClientCases = async ({ id }: { id: string }) => {
    const response = await api.get(`/cases/client/${id}`);
    return response.data;
};