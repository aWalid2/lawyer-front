import api from "@/lib/api";


export const getCases = async (page: number) => {
    const response = await api.get(`cases/all-cases?page=${page}`);
    return response.data;
};