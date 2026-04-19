import api from "@/lib/api";

export const removeFirstInstanceSessionTable = async (sessionId: number) => {
    const response = await api.delete(`/first-instance-session/${sessionId}`);
    return response.data;
};
