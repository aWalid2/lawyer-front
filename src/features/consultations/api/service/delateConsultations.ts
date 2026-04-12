import api from "@/lib/api";


export const deleteConsultation = async (id: string) => {
    const response = await api.delete(`/consultation/${id}`);
    return response.data;
};

