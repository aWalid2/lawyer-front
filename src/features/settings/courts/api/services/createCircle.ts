import api from "@/lib/api";

export const createCircle = async (data: { name: string; court_id: number }) => {
    const response = await api.post("/circles", data);
    return response.data;
};
