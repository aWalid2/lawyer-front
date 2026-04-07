import api from "@/lib/api";

export const createCircle = async (court_id: number, data: { name: string; }) => {
    const response = await api.post(`/circles/${court_id}`, data);
    return response.data;
};
