import api from "@/lib/api";


export const getCases = async () => {
    const response = await api.get("cases/all-cases");
    return response.data;
};