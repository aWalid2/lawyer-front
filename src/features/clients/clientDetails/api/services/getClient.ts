import api from "@/lib/api";


export const getClient = async (id: string) => {
    const response = await api.get(`client-profile/${id}`);
    return response.data;
};