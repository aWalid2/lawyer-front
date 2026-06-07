import api  from "@/lib/api";


export const getNotCompleteTasks = async () => {

    const response = await api.get(`/task/activeTasks`);
    return response.data;

    }