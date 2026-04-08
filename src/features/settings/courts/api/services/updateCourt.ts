import api from "@/lib/api";

export const updateCourt = async (id: string, data: { name: string, address: string }) => {
    const response = await api.patch(`/court/${id}`, data);
    return response.data;
};