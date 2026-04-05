import api from "@/lib/api";

export const getOneLawyer = async ({ id }: { id: string }) => {
    const response = await api.get(`/lawyer/${id}`);
    return response.data;
};