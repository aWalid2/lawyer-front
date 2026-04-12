import api from "@/lib/api";


export const getOneConsultation = async ({ id }: { id: string }) => {
    const response = await api.get(`/consultation/${id}`);
    return response.data;
};

