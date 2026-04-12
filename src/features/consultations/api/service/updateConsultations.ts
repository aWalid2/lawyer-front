import api from "@/lib/api";


export const updateConsultation = async (id: string, consultationData: any) => {
    const response = await api.patch(`/consultation/${id}`, consultationData);
    return response.data;
};

