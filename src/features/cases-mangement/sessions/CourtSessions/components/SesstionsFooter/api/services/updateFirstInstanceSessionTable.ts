import api from "@/lib/api";

export const updateFirstInstanceSessionTable = async (payload: { sessionId: number; data: any }) => {
    const response = await api.patch(`/first-instance-session/${payload.sessionId}`, payload.data);
    return response.data;
};
