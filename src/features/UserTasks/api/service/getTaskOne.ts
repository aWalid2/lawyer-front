// tasks/api/service/getTaskOne.ts
import api from "@/lib/api";

export const getOneTask = async ({ id }: { id: string }) => {
    const response = await api.get(`/task/${id}`);
    console.log("API response for getOneTask:", response);
    return response.data;

};