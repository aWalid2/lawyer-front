import api from "@/lib/api";


export const createPoliceSessions = async (data: any) => {
    const response = await api.post("/police-sessions", data);
    return response.data;
}