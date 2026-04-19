import api from "@/lib/api";

export const updateAppealSessionTable = async (payload: { sessionId: number; data: any }) => {
    const response = await api.patch(`/appeal-session/${payload.sessionId}`, payload.data);
    return response.data;
};
