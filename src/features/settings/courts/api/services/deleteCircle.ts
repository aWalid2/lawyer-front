import api from "@/lib/api";

export const deleteCircle = async (id: number) => {
    const response = await api.delete(`/circles/${id}`);
    return response.data;
};
