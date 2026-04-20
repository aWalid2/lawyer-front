import api from "@/lib/api";

export const updateCassaionSessionTable = async (sessionId: string | number, data: any) => {
    const response = await api.patch(`/cassation-session/${sessionId}`, data);
    return response.data;
};