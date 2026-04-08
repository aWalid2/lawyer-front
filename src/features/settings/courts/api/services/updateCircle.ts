import api from "@/lib/api";

export const updateCircle = async (id: string, data: { name: string }) => {
    const response = await api.patch(`/circles/${id}`, data);
    return response.data;
};
