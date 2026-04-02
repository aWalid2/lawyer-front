import api from "@/lib/api";

export const addPublicProsecutionCase = async (data: any) => {
    const response = await api.post("cases/public-prosecution", data);
    return response.data;
};