import api from "@/lib/api";

export const deleteTask = async ({ id }: { id: string }) => {
    const response = await api.delete(`/task/${id}`);
    return response.data;
};