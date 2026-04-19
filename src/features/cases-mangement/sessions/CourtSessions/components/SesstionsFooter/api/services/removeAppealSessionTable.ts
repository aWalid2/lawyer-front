import api from "@/lib/api";

export const removeAppealSessionTable = async (sessionId: number) => {
    const response = await api.delete(`/appeal-session/${sessionId}`);
    return response.data;
};
