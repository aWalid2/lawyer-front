import api from "@/lib/api";

export const createCourt = async (data: { name: string, address: string }) => {
    const response = await api.post("/court", data);
    return response.data;
};