import api from "@/lib/api";

export const updateAppealSessionTable = async (sessionId: number, data: any) => {
    const response = await api.patch(`/appeal-session/${sessionId}`, data);
    return response.data;
};
