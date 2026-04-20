import api from "@/lib/api";

export const updateFirstInstanceSessionTable = async (sessionId: number, data: any) => {
    const response = await api.patch(`/first-instance/${sessionId}`, data);
    return response.data;
};
