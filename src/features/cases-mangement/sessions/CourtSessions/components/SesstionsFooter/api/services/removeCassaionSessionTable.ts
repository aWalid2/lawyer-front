import api from "@/lib/api";

export const removeCassaionSessionTable = async (sessionId: string | number) => {
    const response = await api.delete(`/cassation-session/${sessionId}`);
    return response.data;
};