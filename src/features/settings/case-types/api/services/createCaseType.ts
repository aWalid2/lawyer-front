import api from "@/lib/api";

export const createCaseType = async (data: { name: string }) => {
    const response = await api.post("/case-type", data);
    return response.data;
};
