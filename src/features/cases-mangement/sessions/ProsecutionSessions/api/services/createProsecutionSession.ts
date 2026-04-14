import api from "@/lib/api";

export const createProsecutionSession = async (data: any) => {
    const response = await api.post("/prosecution-sessions", data);
    return response.data;
}
