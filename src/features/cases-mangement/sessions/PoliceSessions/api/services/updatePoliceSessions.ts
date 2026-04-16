import api from "@/lib/api";


export const updatePoliceSessions =async ({ id, data }: { id: number; data: any }) => {
    const response = await api.patch(`/police-sessions/update-police-session/${id}`,data);
    return response.data;
}