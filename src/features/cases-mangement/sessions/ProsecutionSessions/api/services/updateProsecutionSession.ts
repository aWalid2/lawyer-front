import api from "@/lib/api";

export const updateProsecutionSession = async ({ id, data }: { id: number; data: any }) => {
    const response = await api.patch(`/prosecution-sessions/update-prosecution-session/${id}`, data);
    return response.data;
}
