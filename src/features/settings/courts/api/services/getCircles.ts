import api from "@/lib/api";

export const getCircles = async (court_id: number) => {
    const response = await api.get(`/court/circles/${court_id}`);
    return response.data;
};
