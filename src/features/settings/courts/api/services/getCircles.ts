import api from "@/lib/api";

export const getCircles = async (court_id: number, page: number, limit: number) => {
    const response = await api.get(`/circles/${court_id}?page=${page}&limit=${limit}`);
    return response.data;
};
