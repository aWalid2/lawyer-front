import api  from "@/lib/api";


export const getNotCompleteProcedures = async () => {

    const response = await api.get(`/procedures/active/count`);
    return response.data;

    }