import api from "@/lib/api";

export const getCourts = async (page: number, limit: number) => {
    const response = await api.get(`/court?page=${page}&limit=${limit}`);
    return response.data;
};