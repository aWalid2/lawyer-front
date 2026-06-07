import api  from "@/lib/api";


export const getClientCounts = async () => {

    const response = await api.get(`/client-profile/count`);
    return response.data;

    }