import api from "@/lib/api";

export const addConsultation = async (consultationData: any) => {
    const response = await api.post("/consultation", consultationData);
    return response.data;
};

