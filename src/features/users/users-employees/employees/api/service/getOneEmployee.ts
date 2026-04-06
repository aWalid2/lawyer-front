// employees/api/services/getEmployee.ts
import api from "@/lib/api";

export const getOneEmployee = async (id: string) => {
    try {
        const { data } = await api.get(`/employee/${id}`);
        return data;
    } catch (error: any) {
        throw error;
    }
};