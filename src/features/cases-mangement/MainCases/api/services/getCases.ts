import api from "@/lib/api";


export const getCases = async () => {
    const response = await api.get("case");
    return response.data;
};