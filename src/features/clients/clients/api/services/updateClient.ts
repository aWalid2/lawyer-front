import api from "@/lib/api";

export const updateClient = async ({ id, data }: { id: string; data: any }) => {
    const response = await api.patch(`/users/client/${id}`, data);
    return response.data;
};
