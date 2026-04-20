import api from "@/lib/api";

export const removeFirstInstanceSessionTable = async (sessionId: number) => {
    const response = await api.delete(`/first-instance/${sessionId}`);
    return response.data;
};
