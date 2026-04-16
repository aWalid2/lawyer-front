import api from "@/lib/api";

export const updateProsecutionSessions = async ({ id, data }: { id: number; data: any }) => {
    const response = await api.patch(`/prosecution-session/${id}`, data);
    return response.data;
}
