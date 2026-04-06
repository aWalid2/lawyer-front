import api from "@/lib/api";

export const getCourts = async () => {
    const response = await api.get("/court");
    return response.data;
};