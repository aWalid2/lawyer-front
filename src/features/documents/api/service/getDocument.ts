
import api from "@/lib/api";

export const getDocumentById = async (id: string) => {
    const response = await api.get(`/documnet/${id}`);
    return response.data;
};