import api from "@/lib/api";

export const deleteDocument = async (id: number) => {
    const response = await api.delete(`/documnet/${id}`);
    return response.data;
};