import api from "@/lib/api";


export const getCases = async (page: number, limit: number) => {
    const response = await api.get(`cases/all-cases?page=${page}&limit=${limit}`);
    return response.data;
};