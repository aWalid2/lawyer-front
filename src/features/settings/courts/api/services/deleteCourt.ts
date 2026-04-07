import api from "@/lib/api";

export const deleteCourt = async (id: number) => {
    const response = await api.delete(`/court/${id}`);
    return response.data;
};