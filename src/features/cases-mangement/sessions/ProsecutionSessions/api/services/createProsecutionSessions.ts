import api from "@/lib/api";

export const createProsecutionSessions = async (data: any) => {
    const response = await api.post("/prosecution-sessions", data);
    return response.data;
}
