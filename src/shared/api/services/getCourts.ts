import api from "@/lib/api";

export const getCourts = async (page?: number, limit?: number, search?: string) => {
    const response = await api.get(`/court`, {
        params: {
            page,
            limit,
            search
        }
    });
    return response.data;
};