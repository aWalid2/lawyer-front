import api from "@/lib/api";

export const addCase = async (data: any) => {
    const response = await api.post("case", data);
    return response.data;
};