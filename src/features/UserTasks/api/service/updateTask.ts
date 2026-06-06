
import api from "@/lib/api";

export const updateTask = async (id: string, data: any) => {

        const response = await api.patch(`/task/${id}`, data);
        return response.data;

};