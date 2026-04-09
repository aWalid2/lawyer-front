import api from "@/lib/api";

export const deleteClient = async ({ id }: { id: string }) => {
    const response = await api.delete(`/client-profile/${id}`);
    return response.data;
};