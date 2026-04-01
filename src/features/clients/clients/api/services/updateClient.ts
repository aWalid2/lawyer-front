import api from "@/lib/api";

export const updateClient = async (id: string, clientData: any) => {
    const response = await api.patch(`/client-profile/${id}`, clientData);
    return response.data;
};
