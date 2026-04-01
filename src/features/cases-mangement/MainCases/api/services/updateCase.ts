import api from "@/lib/api";


export const updateCase = async ({ id, data }: { id: string; data: any }) => {
    const response = await api.patch(`case/${id}`, data);
    return response.data;
};