// tasks/api/service/updateTask.ts
import api from "@/lib/api";

export const updateTask = async (id: string, data: any) => {
    try {
        const response = await api.patch(`/task/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};