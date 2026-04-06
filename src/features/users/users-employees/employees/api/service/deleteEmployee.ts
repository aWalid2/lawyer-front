// employees/api/services/deleteEmployee.ts
import api from "@/lib/api";

export const deleteEmployee = async (id: string) => {
    try {
        const { data } = await api.delete(`/employee/${id}`);
        return data;
    } catch (error: any) {
        throw error;
    }
};