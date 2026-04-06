// employees/api/services/updateEmployee.ts
import api from "@/lib/api";

export const updateEmployee = async (id: string, data: any) => {
    try {
        const { data: response } = await api.patch(`/users/${id}`, data);
        return response;
    } catch (error: any) {
        throw error;
    }
};