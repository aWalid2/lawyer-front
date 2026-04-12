import api from "@/lib/api";

export const getConsultations = async () => {
    const response = await api.get("/consultation");
    return response.data;
};

